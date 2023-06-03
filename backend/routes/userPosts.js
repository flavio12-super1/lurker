const express = require("express");
const router = express.Router();
// const { User, Post } = require("../path/to/userModel"); // Replace '../path/to/userModel' with the actual path to your userModel file
const { User, Post } = require("../models/userSchema");

// Route for uploading a post
router.post("/", async (req, res) => {
  try {
    // Retrieve the user from the database based on the user's ID
    const user = await User.findById(req.userId); // Assuming you have the userId available in the request

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Create a new post
    const post = new Post({
      user: user._id, // Set the user for the post
      content: req.body.content, // Assuming the post content is sent in the request body
    });

    // Save the post
    await post.save();

    // Update the user's posts array with the new post ID at the start
    user.posts.unshift(post._id);
    await user.save();

    return res.status(201).json(post); // Return the created post in the response
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Route for retrieving the first 10 posts
router.get("/", async (req, res) => {
  try {
    // Retrieve the user from the database based on the user's ID
    const user = await User.findById(req.userId); // Assuming you have the userId available in the request

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    let { page, pageSize } = req.query;
    page = parseInt(page);
    pageSize = parseInt(pageSize);

    // Calculate the starting index based on the page and pageSize
    const startIndex = (page - 1) * pageSize;

    // Retrieve the post IDs based on the startIndex and pageSize
    const postIds = user.posts.slice(startIndex, startIndex + pageSize);

    // Retrieve the posts based on the IDs and sort them in the order of the IDs
    const posts = await Post.find({ _id: { $in: postIds } }).sort({ _id: -1 });

    // Check if there are more posts available
    const hasMorePosts = user.posts.length > startIndex + pageSize;
    return res.json({ posts, hasMorePosts });
    // return res.json(posts);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Route for retrieving the first 10 posts
router.get("/", async (req, res) => {
  try {
    // Retrieve the user from the database based on the user's ID
    const user = await User.findById(req.userId); // Assuming you have the userId available in the request

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    let { page, pageSize } = req.query;
    page = parseInt(page);
    pageSize = parseInt(pageSize);

    // Calculate the starting index based on the page and pageSize
    const startIndex = (page - 1) * pageSize;

    // Retrieve the post IDs based on the startIndex and pageSize
    const postIds = user.posts.slice(startIndex, startIndex + pageSize);

    // Retrieve the posts based on the IDs and sort them in the order of the IDs
    const posts = await Post.find({ _id: { $in: postIds } }).sort({ _id: -1 });

    // Check if there are more posts available
    const hasMorePosts = user.posts.length > startIndex + pageSize;

    console.log(posts);

    return res.json({ posts: posts, hasMorePosts: hasMorePosts });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
