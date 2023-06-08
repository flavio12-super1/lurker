const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { User } = require("../models/userSchema");

router.post("/", async (req, res, next) => {
  const { roomID } = req.body;
  console.log("roomd id: " + roomID);
  const userId = req.userId;

  try {
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).send("User not found");
    }

    // Search for a channel that includes both current user and target user
    const channel = user.channelList.find((channel) =>
      channel.members.includes(userId)
    );

    if (channel) {
      console.log("found");
      if (channel.messageReferanceID === null) {
        return res.json({ status: true });
      }
      // Channel found, return its channelID
      return res.json({ status: false });
    } else {
      console.log("not found");

      return res.json({ error: "room doesnt exist" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error saving user");
  }
});

module.exports = router;
