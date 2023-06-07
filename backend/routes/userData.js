const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const { User } = require("../models/userSchema");

async function getNotificaitons(notifications) {
  const promises = notifications.map((notification) => {
    return User.findById(notification.userID)
      .select("email")
      .populate("theme.imageURL")
      .lean()
      .exec();
  });
  const results = await Promise.all(promises);
  console.log(results);
  const notificationsWithUsername = results.map((result, index) => {
    return {
      id: notifications[index].id,
      userID: notifications[index].userID,
      email: result.email,
      imageURL: result.theme.imageURL,
    };
  });

  return notificationsWithUsername;
}

async function getFriends(friends) {
  const promises = friends?.map((friend) => {
    return User.findById(friend.userID)
      .select("email")
      .populate("theme.imageURL")
      .lean()
      .exec();
  });
  const results = await Promise.all(promises);
  console.log(results);
  const friendsWithUsername = results.map((result, index) => {
    return {
      id: friends[index].id,
      userID: friends[index].userID,
      email: result.email,
      imageURL: result.theme.imageURL,
      channelID: friends[index].channelID,
    };
  });
  return friendsWithUsername;
}

router.post("/", async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    const notifications = user.notifications;
    const friends = user.friendList;
    const following = user.following;
    console.log("friends channel id: " + friends[0]?.channelID);

    const notificationsWithUsername = await getNotificaitons(notifications);
    const friendsWithUsername = await getFriends(friends);
    console.log("user data being sent to client");
    res.json({
      notifications: notificationsWithUsername,
      friends: friendsWithUsername,
      following: following,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
