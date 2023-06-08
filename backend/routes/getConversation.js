const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { User } = require("../models/userSchema");

router.post("/", async (req, res, next) => {
  const { id } = req.body; // Assuming the selected theme is sent from the frontend
  console.log("currently viewing id: " + id);

  const userId = req.userId; // Assuming you have the user's ID in the session
  console.log("user id: " + userId);
  try {
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).send("User not found");
    }
    console.log(user);
    res.json({ channelID: "testing" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error saving user");
  }
});

module.exports = router;
