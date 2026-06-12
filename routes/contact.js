const router = require("express").Router();
const Contact = require("../models/Contact");

// SAVE CONTACT FORM
router.post("/", async (req, res) => {
    try {
        const newMsg = new Contact(req.body);
        await newMsg.save();
        res.json({ success: true, message: "Contact saved" });
    } catch (err) {
        console.error("Contact save error:", err);
        res.status(500).json({ error: "Failed to send message" });
    }
});

