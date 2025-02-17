const express = require("express");
const User = require("../models/User");

const router = express.Router();

// Get all users (limit to 10)
router.get("/", async (req, res) => {
    try {
        const users = await User.find().limit(10);
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users" });
    }
});

module.exports = router;
