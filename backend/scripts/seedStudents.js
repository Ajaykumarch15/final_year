const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("../models/User");
const StudentProfile = require("../models/StudentProfile");

const students = [
    //csm stuents
    /* { rollNo: "A22126552001", name: "JYOTHI PRABHASH ANNEPU" },
     { rollNo: "A22126552002", name: "SAI GNANITA B" },
     { rollNo: "A22126552003", name: "NIRMALA BEHARA" },
     { rollNo: "A22126552004", name: "VINEELA BELAMANA" },
     { rollNo: "A22126552005", name: "MOHAMMED NIZAM BHAMBANI" },
     { rollNo: "A22126552006", name: "SRI HARSHINI BHUPATHIRAJU" },
     { rollNo: "A22126552007", name: "ARYAN MODA RAJ BODANKI" },
     { rollNo: "A22126552008", name: "SESHU BODDU" },
     { rollNo: "A22126552009", name: "KIRAN BOJANKI" },
     { rollNo: "A22126552010", name: "PADMANABHASAI PAKALA CHARAN" },
     { rollNo: "A22126552011", name: "LIKHITA CHILLA" },
     { rollNo: "A22126552013", name: "MANOHAR GONDU" },
     { rollNo: "A22126552014", name: "VISHNU VARMA INDUKURI" },
     { rollNo: "A22126552015", name: "ITHADI JOSEPH" },
     { rollNo: "A22126552016", name: "JYOTSNA KANCHARANA" },
     { rollNo: "A22126552017", name: "SURYA TEJA KANCHARLA" },
     { rollNo: "A22126552018", name: "THRISHANK KARRI" },
     { rollNo: "A22126552019", name: "SAI VENKATA SATHWIK KILARI" },
     { rollNo: "A22126552020", name: "BHAGYA SREE KILLI" },
     { rollNo: "A22126552021", name: "PRAVEEN KUMAR KINTHALI" },
     { rollNo: "A22126552022", name: "AKASH KORADA" },
     { rollNo: "A22126552023", name: "LIKHITA MADDALA" },
     { rollNo: "A22126552024", name: "AISWARYA MADDAMSETTY" },
     { rollNo: "A22126552025", name: "SHASHANK MAMIDIPALLI" },
     { rollNo: "A22126552026", name: "NAGA SATYA GAGAN SAI MEKALA" },
     { rollNo: "A22126552027", name: "SRIHARI MODE" },
     { rollNo: "A22126552028", name: "KARISHMA MOHAMMAD" },
     { rollNo: "A22126552029", name: "TEJESWAR MUDILI" },
     { rollNo: "A22126552030", name: "SUSHMA NANDIGANA" },
     { rollNo: "A22126552031", name: "PANDA OMKAR" }*/
    { rollNo: "A22126552040", name: "DURGA SRI LAHARI POTHIREDDY", branch: "CSE" },
    { rollNo: "A22126552041", name: "BHUVANA SASHANKA PUREDDY", branch: "CSE" },
    { rollNo: "A22126552042", name: "YAMINI PURUSHOTTAM", branch: "CSE" },
    { rollNo: "A22126552043", name: "MAHATHI RELANGI", branch: "CSE" },
    { rollNo: "A22126552044", name: "VENKATA DEEKSHITHA RUDRAPATI", branch: "CSE" },
    { rollNo: "A22126552045", name: "VEERENDRA SANGULA", branch: "CSE" },
    { rollNo: "A22126552046", name: "DINESH KANNA SARAGADAM", branch: "CSE" },
    { rollNo: "A22126552047", name: "NEERAJ KUMAR SEERAM", branch: "CSE" },
    { rollNo: "A22126552048", name: "SAI SURYA PRANAV SEKHARAMAHANTHI", branch: "CSE" },
    { rollNo: "A22126552049", name: "PARVEEN SHABANA", branch: "CSE" },
    { rollNo: "A22126552050", name: "NOUSHED SHAIK", branch: "CSE" },

    { rollNo: "A22126552051", name: "CHARITH SOMBHATLA", branch: "CSD" },
    { rollNo: "A22126552052", name: "MANISH RAJ SUNKASURI", branch: "CSD" },
    { rollNo: "A22126552053", name: "DIVYA TURPATI", branch: "CSD" },
    { rollNo: "A22126552054", name: "DHARANESH UPPADA", branch: "CSD" },
    { rollNo: "A22126552055", name: "ESWAR ABHINAV VANAPALLI", branch: "CSD" },
    { rollNo: "A22126552056", name: "YAGNESWARA REDDY VANIPENTA", branch: "CSD" },
    { rollNo: "A22126552057", name: "TEJ SHYAM SUNDAR VASIREDDY", branch: "CSD" }

];

async function seedStudents() {

    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected");

    for (const s of students) {

        const email = `${s.rollNo.toLowerCase()}@nexthire.com`;

        const exists = await User.findOne({ email });

        if (exists) {
            console.log(`Skipping ${s.rollNo} (already exists)`);
            continue;
        }

        const hashedPassword = await bcrypt.hash(s.rollNo, 10);

        const user = await User.create({
            name: s.name,
            email,
            password: hashedPassword,
            role: "student"
        });

        /*await StudentProfile.create({
            user: user._id,
            rollNo: s.rollNo,
            branch: "CSE",
            cgpa: 0,
            skills: []
        });*/
        await StudentProfile.create({
            user: user._id,
            rollNo: s.rollNo,
            branch: s.branch,
            cgpa: 0,
            skills: []
        });

        console.log(`Created student: ${s.rollNo}`);

    }

    console.log("Seeding completed");

    process.exit();
}

seedStudents();