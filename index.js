require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
app.use(express.json());

// ✅ CORS Configuration
const corsOptions = {
    origin: ["http://localhost:3000", "https://devessence.vercel.app"], // ✅ Allows both local & deployed frontend
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
    credentials: true
};
app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // ✅ Explicitly handle preflight requests

// ✅ Configure Nodemailer Transporter
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD, // ✅ Use a Google App Password (not your actual password)
    },
});

// ✅ Test Server Route
app.get("/", (req, res) => {
    res.send("Hello, DevEssence! Server is running ✅");
});

// ✅ Email Sending Route
app.post("/send-email", async (req, res) => {
    const { name, email, message } = req.body;

    // ✅ Validate Input
    if (!name || !email || !message) {
        return res.status(400).json({ success: false, message: "All fields are required!" });
    }

    const mailOptions = {
        from: `"DevEssence Contact" <${process.env.EMAIL}>`, // ✅ Better "From" field
        to: process.env.TO_EMAIL,
        subject: `New Contact Form Submission from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    try {
        console.log("📧 Sending email with options:", mailOptions);
        await transporter.sendMail(mailOptions);
        console.log("✅ Email sent successfully");
        res.status(200).json({ success: true, message: "Email sent successfully! 🚀" });
    } catch (error) {
        console.error("❌ Error sending email:", error);
        res.status(500).json({ success: false, message: "Failed to send email!" });
    }
});

// ✅ Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Server running on port ${PORT}`);
    if (process.env.RAILWAY_STATIC_URL) {
        console.log(`🌍 Deployed at: https://${process.env.RAILWAY_STATIC_URL}`);
    }
});
