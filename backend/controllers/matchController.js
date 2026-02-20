const Match = require("../models/Match");
const StudentProfile = require("../models/StudentProfile");
const Job = require("../models/Job");
const { Parser } = require("json2csv");
const PDFDocument = require("pdfkit");
exports.buildOverviewData = async (query) => {
    const { branch, minCgpa, minScore, skill, search } = query;

    let studentQuery = {};

    if (branch) studentQuery.branch = branch;
    if (minCgpa) studentQuery.cgpa = { $gte: Number(minCgpa) };

    if (skill) {
        const skillsArray = skill.split(",").map(s => s.toLowerCase());
        studentQuery.skills = { $all: skillsArray };
    }

    const students = await StudentProfile.find(studentQuery)
        .populate("user", "name email");

    let overview = [];

    for (const student of students) {

        const matches = await Match.find({ student: student._id });

        if (!matches.length) continue;

        const bestScore = Math.max(...matches.map(m => m.finalScore));

        if (minScore && bestScore < Number(minScore)) continue;

        if (
            search &&
            !student.user.name.toLowerCase().includes(search.toLowerCase())
        ) continue;

        overview.push({
            name: student.user.name,
            rollNo: student.rollNo,
            branch: student.branch,
            cgpa: student.cgpa,
            bestScore,
            totalMatches: matches.length,
        });
    }

    return overview.sort((a, b) => b.bestScore - a.bestScore);
};

/*
  GET MATCHES FOR LOGGED IN STUDENT
*/
exports.getMyMatches = async (req, res) => {
    try {
        // 1️⃣ Find student profile from logged-in user
        const profile = await StudentProfile.findOne({
            user: req.user.id,
        });

        if (!profile) {
            return res.status(404).json({
                message: "Student profile not found",
            });
        }

        // 2️⃣ Fetch matches using student profile ID
        const matches = await Match.find({
            student: profile._id,
        })
            .populate("job")
            .sort({ rank: 1 });

        res.json(matches);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

/*
  GET MATCHES FOR SPECIFIC STUDENT (Staff/Admin)
*/
exports.getMatchesByUserId = async (req, res) => {
    try {
        const profile = await StudentProfile.findOne({
            user: req.params.userId,
        });

        if (!profile) {
            return res.status(404).json({
                message: "Student profile not found",
            });
        }

        const matches = await Match.find({
            student: profile._id,
        })
            .populate("job")
            .sort({ rank: 1 });

        res.json(matches);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

/*
  GET MATCH OVERVIEW (Staff/Admin)
*/

exports.getMatchOverview = async (req, res) => {
    try {
        const overview = await exports.buildOverviewData(req.query);

        const { page = 1, limit = 10 } = req.query;
        const skip = (Number(page) - 1) * Number(limit);

        const total = overview.length;
        const paginated = overview.slice(skip, skip + Number(limit));

        return res.json({
            total,
            page: Number(page),
            limit: Number(limit),
            data: paginated
        });

    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

const drawTableRow = (doc, y, row) => {
    doc
        .fontSize(10)
        .fillColor("black")
        .text(row.rollNo, 50, y)
        .text(row.name, 120, y)
        .text(row.branch, 240, y)
        .text(row.cgpa, 350, y, { width: 60, align: "right" })
        .text(row.bestScore, 430, y, { width: 80, align: "right" });
};


exports.getAnalytics = async (req, res) => {
    try {
        const totalStudents = await StudentProfile.countDocuments();
        const totalMatches = await Match.countDocuments();
        const jobsCount = await Job.countDocuments();

        const avgScoreAgg = await Match.aggregate([
            {
                $group: {
                    _id: null,
                    avg: { $avg: "$finalScore" },
                },
            },
        ]);

        const avgScore = avgScoreAgg[0]?.avg || 0;

        const highPerformers = await Match.countDocuments({
            finalScore: { $gte: 80 },
        });

        // Branch distribution
        const branchDistribution = await StudentProfile.aggregate([
            {
                $group: {
                    _id: "$branch",
                    count: { $sum: 1 },
                },
            },
        ]);

        // Score buckets
        const scoreBuckets = await Match.aggregate([
            {
                $bucket: {
                    groupBy: "$finalScore",
                    boundaries: [0, 60, 70, 80, 90, 100],
                    default: "Other",
                    output: {
                        count: { $sum: 1 },
                    },
                },
            },
        ]);

        res.json({
            totalStudents,
            totalMatches,
            avgScore,
            highPerformers,
            jobsCount,
            branchDistribution,
            scoreBuckets,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


const path = require("path");

exports.exportFilteredPDF = async (req, res) => {
    try {
        const overview = await exports.buildOverviewData(req.query);

        const doc = new PDFDocument({ margin: 40 });

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader(
            "Content-Disposition",
            "attachment; filename=NextHire_Report.pdf"
        );

        doc.pipe(res);

        const path = require("path");
        const logoPath = path.join(__dirname, "../assets/nexthire-logo.png");

        try {
            doc.image(logoPath, 40, 30, { width: 60 });
        } catch (e) {
            console.log("Logo not found");
        }

        doc.fontSize(22).text("Next Hire", 120, 40);
        doc.fontSize(14).text("Placement Analytics Report", 120, 65);

        doc.moveDown(3);
        doc.fontSize(10).text(`Generated: ${new Date().toLocaleString()}`);
        doc.moveDown(2);

        let y = doc.y;

        // Table header
        doc.rect(40, y - 5, 520, 20).fill("#e2e8f0");
        doc.fillColor("black");

        drawTableRow(doc, y, {
            rollNo: "Roll",
            name: "Name",
            branch: "Branch",
            cgpa: "CGPA",
            bestScore: "Best Score",
        });

        y += 25;

        overview.forEach((student, index) => {

            if (y > 750) {
                doc.addPage();
                y = 50;
            }

            if (index % 2 === 0) {
                doc.rect(40, y - 3, 520, 20).fill("#f8fafc");
                doc.fillColor("black");
            }

            drawTableRow(doc, y, {
                rollNo: student.rollNo || "-",
                name: student.name || "-",
                branch: student.branch,
                cgpa: student.cgpa.toFixed(2),
                bestScore: `${student.bestScore.toFixed(1)}%`,
            });

            y += 22;
        });

        doc.moveDown(2);
        doc.fontSize(10).text(`Total Students: ${overview.length}`);

        doc.end();

    } catch (err) {
        console.error(err);
        if (!res.headersSent) {
            res.status(500).json({ message: err.message });
        }
    }
};







exports.exportFilteredStudents = async (req, res) => {
    try {
        const { branch, minCgpa = 0, minScore = 0, search = "", format = "csv" } = req.query;

        const matchFilter = {};
        if (minScore) {
            matchFilter.finalScore = { $gte: Number(minScore) };
        }

        const matches = await Match.find(matchFilter)
            .populate({
                path: "student",
                match: {
                    ...(branch && { branch }),
                    cgpa: { $gte: Number(minCgpa) },
                },
                populate: {
                    path: "user",
                    match: search
                        ? { name: { $regex: search, $options: "i" } }
                        : {},
                },
            })
            .sort({ finalScore: -1 });

        const filtered = matches.filter(m => m.student && m.student.user);

        if (format === "pdf") {
            const doc = new PDFDocument();
            res.setHeader("Content-Type", "application/pdf");
            res.setHeader(
                "Content-Disposition",
                "attachment; filename=students_report.pdf"
            );

            doc.pipe(res);

            doc.fontSize(18).text("Next Hire - Student Match Report");
            doc.moveDown();

            filtered.forEach((m, index) => {
                doc.fontSize(12).text(
                    `${index + 1}. ${m.student.user.name} | ${m.student.branch} | CGPA: ${m.student.cgpa} | Score: ${m.finalScore.toFixed(1)}%`
                );
            });

            doc.end();
            return;
        }

        // Default CSV
        const csvHeader = "Name,Branch,CGPA,Final Score\n";
        const csvRows = filtered
            .map(
                m =>
                    `${m.student.user.name},${m.student.branch},${m.student.cgpa},${m.finalScore.toFixed(1)}`
            )
            .join("\n");

        res.setHeader("Content-Type", "text/csv");
        res.setHeader(
            "Content-Disposition",
            "attachment; filename=students_report.csv"
        );

        res.send(csvHeader + csvRows);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.exportOverviewCSV = async (req, res) => {
    try {
        const overview = await buildOverviewData(req.query);

        const parser = new Parser();
        const csv = parser.parse(overview);

        res.header("Content-Type", "text/csv");
        res.attachment("filtered_students.csv");
        res.send(csv);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};






exports.getLeaderboard = async (req, res) => {
    try {
        const leaderboard = await Match.aggregate([
            {
                $group: {
                    _id: "$student",
                    bestScore: { $max: "$finalScore" },
                },
            },
            { $sort: { bestScore: -1 } },
            { $limit: 10 },
        ]);

        res.json(leaderboard);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

