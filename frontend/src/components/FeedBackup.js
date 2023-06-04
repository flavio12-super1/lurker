// import React, { useState, useEffect, useRef } from "react";
// import axiosInstance from "../config/axiosConfig";
// import "../styles/Feed.css"; // Import the CSS file for styling
// import loadingImg from "./loading.gif";

// const Feed = () => {
//   const [content, setContent] = useState("");
//   const [posts, setPosts] = useState([]);
//   const [page, setPage] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [hasMorePosts, setHasMorePosts] = useState(true); // Add hasMorePosts state
//   const postListRef = useRef(null);

//   const handleInputChange = (event) => {
//     setContent(event.target.value);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     try {
//       const response = await axiosInstance.post("/userPosts", { content });

//       setPosts((prevPosts) => [response.data, ...prevPosts]);
//       console.log(response.data);
//       setContent("");
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const fetchPosts = async () => {
//     try {
//       if (!hasMorePosts) return; // Stop making requests if no more posts
//       setLoading(true);

//       const response = await axiosInstance.get(
//         `/userPosts?page=${page}&pageSize=10`
//       );
//       const newPosts = response.data.posts;
//       console.log(response.data.hasMorePosts);

//       setPosts((prevPosts) => [...prevPosts, ...newPosts]);
//       setPage((prevPage) => prevPage + 1);
//       setLoading(false);

//       if (newPosts.length === 0) {
//         setHasMorePosts(false); // Set hasMorePosts to false if no new posts are found
//       }
//     } catch (error) {
//       console.error(error);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPosts();
//   }, []);

//   const handleScroll = () => {
//     const { scrollTop, clientHeight, scrollHeight } = postListRef.current;

//     if (scrollTop + clientHeight >= scrollHeight - 10 && !loading) {
//       fetchPosts();
//     }
//   };

//   return (
//     <div className="feed-container">
//       <div className="feed-inner-container">
//         <form onSubmit={handleSubmit} className="post-form">
//           <input
//             type="text"
//             value={content}
//             onChange={handleInputChange}
//             placeholder="Enter post content"
//             className="post-input"
//           />
//           <button type="submit" className="post-button">
//             Submit
//           </button>
//         </form>
//         <h2 className="post-heading">Posts:</h2>
//         <div className="post-list" onScroll={handleScroll} ref={postListRef}>
//           <div>
//             {posts.map((post) => (
//               <div key={post._id} className="post-item">
//                 {post.content}
//               </div>
//             ))}
//           </div>
//         </div>
//         {loading && (
//           <div className="loading-animation">
//             <img
//               src={loadingImg}
//               alt="Loading"
//               style={{ width: "100px", height: "100px" }}
//             />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Feed;

// import React, { useState, useEffect, useRef } from "react";
// import axiosInstance from "../config/axiosConfig";
// import "../styles/Feed.css"; // Import the CSS file for styling
// import loadingImg from "./loading.gif";

// const ReplyForm = ({ postId, parentReplyId, handleReplySubmit }) => {
//   const [content, setContent] = useState("");

//   const handleInputChange = (event) => {
//     setContent(event.target.value);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     try {
//       const response = await axiosInstance.post(
//         `/userPosts/${postId}/replies`,
//         {
//           content,
//           parentReplyId,
//         }
//       );

//       handleReplySubmit(response.data);
//       setContent("");
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="reply-form">
//       <input
//         type="text"
//         value={content}
//         onChange={handleInputChange}
//         placeholder="Enter reply content"
//         className="reply-input"
//       />
//       <button type="submit" className="reply-button">
//         Reply
//       </button>
//     </form>
//   );
// };

// const Feed = () => {
//   const [content, setContent] = useState("");
//   const [posts, setPosts] = useState([]);
//   const [page, setPage] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [hasMorePosts, setHasMorePosts] = useState(true); // Add hasMorePosts state
//   const postListRef = useRef(null);

//   const handleInputChange = (event) => {
//     setContent(event.target.value);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     try {
//       const response = await axiosInstance.post("/userPosts", { content });

//       setPosts((prevPosts) => [response.data, ...prevPosts]);
//       setContent("");
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const fetchPosts = async () => {
//     try {
//       if (!hasMorePosts) return; // Stop making requests if no more posts
//       setLoading(true);

//       const response = await axiosInstance.get(
//         `/userPosts?page=${page}&pageSize=10`
//       );
//       const newPosts = response.data.posts;

//       setPosts((prevPosts) => [...prevPosts, ...newPosts]);
//       setPage((prevPage) => prevPage + 1);
//       setLoading(false);

//       if (newPosts.length === 0) {
//         setHasMorePosts(false); // Set hasMorePosts to false if no new posts are found
//       }
//     } catch (error) {
//       console.error(error);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPosts();
//   }, []);

//   const handleScroll = () => {
//     const { scrollTop, clientHeight, scrollHeight } = postListRef.current;

//     if (scrollTop + clientHeight >= scrollHeight - 10 && !loading) {
//       fetchPosts();
//     }
//   };

//   const handleReplySubmit = (newReply) => {
//     setPosts((prevPosts) =>
//       prevPosts.map((post) => {
//         if (post._id === newReply.postId) {
//           post.replies.push(newReply);
//         }
//         return post;
//       })
//     );
//   };

//   return (
//     <div className="feed-container">
//       <div className="feed-inner-container">
//         <form onSubmit={handleSubmit} className="post-form">
//           <input
//             type="text"
//             value={content}
//             onChange={handleInputChange}
//             placeholder="Enter post content"
//             className="post-input"
//           />
//           <button type="submit" className="post-button">
//             Submit
//           </button>
//         </form>
//         <h2 className="post-heading">Posts:</h2>
//         <div className="post-list" onScroll={handleScroll} ref={postListRef}>
//           <div>
//             {posts.map((post) => (
//               <div key={post._id} className="post-item">
//                 <div>{post.content}</div>
//                 {post.replies && post.replies.length > 0 && (
//                   <div className="replies">
//                     {post.replies.map((reply) => (
//                       <div key={reply._id} className="reply-item">
//                         <div>{reply.content}</div>
//                         <ReplyForm
//                           postId={post._id}
//                           parentReplyId={reply._id}
//                           handleReplySubmit={handleReplySubmit}
//                         />
//                       </div>
//                     ))}
//                   </div>
//                 )}
//                 <ReplyForm
//                   postId={post._id}
//                   parentReplyId={null}
//                   handleReplySubmit={handleReplySubmit}
//                 />
//               </div>
//             ))}
//           </div>
//         </div>
//         {loading && (
//           <div className="loading-animation">
//             <img
//               src={loadingImg}
//               alt="Loading"
//               style={{ width: "100px", height: "100px" }}
//             />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Feed;

// import React, { useState, useEffect, useRef } from "react";
// import axiosInstance from "../config/axiosConfig";
// import "../styles/Feed.css"; // Import the CSS file for styling
// import loadingImg from "./loading.gif";

// const ReplyForm = ({ postId, parentReplyId, handleReplySubmit }) => {
//   const [content, setContent] = useState("");

//   const handleInputChange = (event) => {
//     setContent(event.target.value);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     try {
//       const response = await axiosInstance.post(
//         `/userPosts/${postId}/replies`,
//         {
//           content,
//           parentReplyId,
//         }
//       );

//       handleReplySubmit(response.data);
//       setContent("");
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="reply-form">
//       <input
//         type="text"
//         value={content}
//         onChange={handleInputChange}
//         placeholder="Enter reply content"
//         className="reply-input"
//       />
//       <button type="submit" className="reply-button">
//         Reply
//       </button>
//     </form>
//   );
// };

// const renderReplies = (replies, handleReplySubmit, postId, parentPostId) => {
//   return (
//     <div className="replies">
//       {replies.map((reply) => (
//         <div key={reply._id} className="reply-item">
//           <div>{reply.content}</div>
//           <div>Post ID: {postId}</div> {/* Added the post ID */}
//           <div>Parent Post ID: {parentPostId}</div>{" "}
//           {/* Added the parent post ID */}
//           {reply.replies &&
//             reply.replies.length > 0 &&
//             renderReplies(reply.replies, handleReplySubmit, postId, reply._id)}
//           <ReplyForm
//             postId={postId}
//             parentReplyId={reply._id}
//             handleReplySubmit={handleReplySubmit}
//           />
//         </div>
//       ))}
//     </div>
//   );
// };

// const Feed = () => {
//   const [content, setContent] = useState("");
//   const [posts, setPosts] = useState([]);
//   const [page, setPage] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [hasMorePosts, setHasMorePosts] = useState(true); // Add hasMorePosts state
//   const postListRef = useRef(null);

//   const handleInputChange = (event) => {
//     setContent(event.target.value);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     try {
//       const response = await axiosInstance.post("/userPosts", { content });

//       setPosts((prevPosts) => [response.data, ...prevPosts]);
//       setContent("");
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const fetchPosts = async () => {
//     try {
//       if (!hasMorePosts) return; // Stop making requests if no more posts
//       setLoading(true);

//       const response = await axiosInstance.get(
//         `/userPosts?page=${page}&pageSize=10`
//       );
//       const newPosts = response.data.posts;
//       console.log(newPosts);

//       setPosts((prevPosts) => [...prevPosts, ...newPosts]);
//       setPage((prevPage) => prevPage + 1);
//       setLoading(false);

//       if (newPosts.length === 0) {
//         setHasMorePosts(false); // Set hasMorePosts to false if no new posts are found
//       }
//     } catch (error) {
//       console.error(error);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPosts();
//   }, []);

//   const handleScroll = () => {
//     const { scrollTop, clientHeight, scrollHeight } = postListRef.current;

//     if (scrollTop + clientHeight >= scrollHeight - 10 && !loading) {
//       fetchPosts();
//     }
//   };

//   const handleReplySubmit = (newReply) => {
//     setPosts((prevPosts) =>
//       prevPosts.map((post) => {
//         if (post._id === newReply.postId) {
//           // Ensure that the 'replies' array exists before pushing the new reply
//           post.replies = post.replies || [];
//           updateNestedReplies(post.replies, newReply);
//         }
//         return post;
//       })
//     );
//   };

//   const updateNestedReplies = (replies, newReply) => {
//     for (const reply of replies) {
//       if (reply._id === newReply.parentReplyId) {
//         // Ensure that the 'replies' array exists before pushing the new nested reply
//         reply.replies = reply.replies || [];
//         reply.replies.push(newReply);
//         return;
//       }
//       if (reply.replies) {
//         updateNestedReplies(reply.replies, newReply);
//       }
//     }
//   };

//   return (
//     <div className="feed-container">
//       <div className="feed-inner-container">
//         <form onSubmit={handleSubmit} className="post-form">
//           <input
//             type="text"
//             value={content}
//             onChange={handleInputChange}
//             placeholder="Enter post content"
//             className="post-input"
//           />
//           <button type="submit" className="post-button">
//             Submit
//           </button>
//         </form>
//         <h2 className="post-heading">Posts:</h2>
//         <div className="post-list" onScroll={handleScroll} ref={postListRef}>
//           <div>
//             {posts.map((post) => (
//               <div key={post._id} className="post-item">
//                 <div>Post ID: {post._id}</div> {/* Display the post ID */}
//                 <div>{post.content}</div>
//                 {post.replies &&
//                   post.replies.length > 0 &&
//                   renderReplies(
//                     post.replies,
//                     handleReplySubmit,
//                     post.replies[0]._id,
//                     post._id
//                   )}
//                 {/* Pass null as the parent post ID */}
//                 <ReplyForm
//                   postId={post._id}
//                   parentReplyId={null}
//                   handleReplySubmit={handleReplySubmit}
//                 />
//               </div>
//             ))}
//           </div>
//         </div>

//         {loading && (
//           <div className="loading-animation">
//             <img
//               src={loadingImg}
//               alt="Loading"
//               style={{ width: "100px", height: "100px" }}
//             />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Feed;

import React, { useState, useEffect, useRef } from "react";
import axiosInstance from "../config/axiosConfig";
import "../styles/Feed.css"; // Import the CSS file for styling
import loadingImg from "./loading.gif";

const ReplyForm = ({ postId, parentReplyId, handleReplySubmit }) => {
  const [content, setContent] = useState("");

  const handleInputChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axiosInstance.post(
        `/userPosts/${postId}/replies`,
        {
          content,
          parentReplyId,
        }
      );

      handleReplySubmit(response.data);
      setContent("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="reply-form">
      <input
        type="text"
        value={content}
        onChange={handleInputChange}
        placeholder="Enter reply content"
        className="reply-input"
      />
      <button type="submit" className="reply-button">
        Reply
      </button>
    </form>
  );
};

const renderReplies = (replies, handleReplySubmit, postId, parentPostId) => {
  return (
    <div className="replies">
      {replies.map((reply) => (
        <div key={reply._id} className="reply-item">
          <div>{reply.content}</div>
          <div>Post ID: {postId}</div> {/* Added the post ID */}
          <div>Parent Post ID: {parentPostId}</div>{" "}
          {/* Added the parent post ID */}
          {reply.replies &&
            reply.replies.length > 0 &&
            renderReplies(reply.replies, handleReplySubmit, postId, reply._id)}
          <ReplyForm
            postId={postId}
            parentReplyId={reply._id}
            handleReplySubmit={handleReplySubmit}
          />
        </div>
      ))}
    </div>
  );
};

const Feed = () => {
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMorePosts, setHasMorePosts] = useState(true); // Add hasMorePosts state
  const postListRef = useRef(null);

  const handleInputChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axiosInstance.post("/userPosts", { content });

      setPosts((prevPosts) => [response.data, ...prevPosts]);
      setContent("");
    } catch (error) {
      console.error(error);
    }
  };

  const fetchPosts = async () => {
    try {
      if (!hasMorePosts) return; // Stop making requests if no more posts
      setLoading(true);

      const response = await axiosInstance.get(
        `/userPosts?page=${page}&pageSize=10`
      );
      const newPosts = response.data.posts;
      console.log(newPosts);

      setPosts((prevPosts) => [...prevPosts, ...newPosts]);
      setPage((prevPage) => prevPage + 1);
      setLoading(false);

      if (newPosts.length === 0) {
        setHasMorePosts(false); // Set hasMorePosts to false if no new posts are found
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = postListRef.current;

    if (scrollTop + clientHeight >= scrollHeight - 10 && !loading) {
      fetchPosts();
    }
  };

  const handleReplySubmit = (newReply) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post._id === newReply.postId) {
          // Ensure that the 'replies' array exists before pushing the new reply
          post.replies = post.replies || [];
          updateNestedReplies(post.replies, newReply);
        }
        return post;
      })
    );
  };

  const updateNestedReplies = (replies, newReply) => {
    for (const reply of replies) {
      if (reply._id === newReply.parentReplyId) {
        // Ensure that the 'replies' array exists before pushing the new nested reply
        reply.replies = reply.replies || [];
        reply.replies.push(newReply);
        return;
      }
      if (reply.replies) {
        updateNestedReplies(reply.replies, newReply);
      }
    }
  };

  return (
    <div className="feed-container">
      <div className="feed-inner-container">
        <form onSubmit={handleSubmit} className="post-form">
          <input
            type="text"
            value={content}
            onChange={handleInputChange}
            placeholder="Enter post content"
            className="post-input"
          />
          <button type="submit" className="post-button">
            Submit
          </button>
        </form>
        <h2 className="post-heading">Posts:</h2>
        <div className="post-list" onScroll={handleScroll} ref={postListRef}>
          <div>
            {posts.map((post) => (
              <div key={post._id} className="post-item">
                <div>Post ID: {post._id}</div> {/* Display the post ID */}
                <div>{post.content}</div>
                {post.replies &&
                  post.replies.length > 0 &&
                  renderReplies(
                    post.replies,
                    handleReplySubmit,
                    post.replies[0]._id,
                    post._id
                  )}
                {/* Pass null as the parent post ID */}
                <ReplyForm
                  postId={post._id}
                  parentReplyId={null}
                  handleReplySubmit={handleReplySubmit}
                />
              </div>
            ))}
          </div>
        </div>

        {loading && (
          <div className="loading-animation">
            <img
              src={loadingImg}
              alt="Loading"
              style={{ width: "100px", height: "100px" }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Feed;
