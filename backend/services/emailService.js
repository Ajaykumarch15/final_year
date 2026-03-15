const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendJobMatchEmail = async (studentEmail, matches) => {

    console.log("📧 Attempting to send email to:", studentEmail);

    let jobsList = matches.map(
        (m, i) => `${i + 1}. Job ID: ${m.jobId} | Score: ${m.finalScore}`
    ).join("\n");

    const mailOptions = {
        from: `"NextHire" <${process.env.EMAIL_FROM}>`,
        to: studentEmail,
        subject: "NEXT HIRE: New Job Matches Found",
        text: `
Hello,

We found new job matches for your profile.

Top Recommendations:

${jobsList}

Please login to the NEXT HIRE platform to view details.

Best regards,
NEXT HIRE Placement System
`
    };

    await transporter.sendMail(mailOptions);

    console.log("✅ Email sent successfully to:", studentEmail);
};

module.exports = { sendJobMatchEmail };