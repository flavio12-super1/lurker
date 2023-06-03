// import React, { useState, useEffect, useRef } from "react";
// import axiosInstance from "../config/axiosConfig";
// import "../styles/Feed.css"; // Import the CSS file for styling

// const Feed = () => {
//   const [content, setContent] = useState("");
//   const [posts, setPosts] = useState([]);
//   const [page, setPage] = useState(1);
//   const [loading, setLoading] = useState(false);
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
//       setLoading(true);

//       const response = await axiosInstance.get(
//         `/userPosts?page=${page}&pageSize=10`
//       );
//       const newPosts = response.data;

//       setPosts((prevPosts) => [...prevPosts, ...newPosts]);
//       setPage((prevPage) => prevPage + 1);
//       setLoading(false);
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
//       <form onSubmit={handleSubmit} className="post-form">
//         <input
//           type="text"
//           value={content}
//           onChange={handleInputChange}
//           placeholder="Enter post content"
//           className="post-input"
//         />
//         <button type="submit" className="post-button">
//           Submit
//         </button>
//       </form>

//       <h2 className="post-heading">Posts:</h2>
//       <div className="post-list" onScroll={handleScroll} ref={postListRef}>
//         {posts.map((post) => (
//           <div key={post._id} className="post-item">
//             {post.content}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Feed;

import React, { useState, useEffect, useRef } from "react";
import axiosInstance from "../config/axiosConfig";
import "../styles/Feed.css"; // Import the CSS file for styling
import loadingImg from "./loading.gif";

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
      console.log(response.data);
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
      console.log(response.data.hasMorePosts);

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
                {post.content}
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
      {/* {loading && (
        <div className="loading-animation">
          <img src={loadingImg} alt="Loading" />
        </div>
      )} */}
    </div>
  );
};

export default Feed;

// import React, { useState, useEffect, useRef } from "react";
// import axiosInstance from "../config/axiosConfig";
// import "../styles/Feed.css"; // Import the CSS file for styling

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
//       const newPosts = response.data;
//       console.log(newPosts);

//       if (newPosts === null) {
//         setHasMorePosts(false); // Set hasMorePosts to false if response is not an array
//         setLoading(false);
//         return;
//       }

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
//       <form onSubmit={handleSubmit} className="post-form">
//         <input
//           type="text"
//           value={content}
//           onChange={handleInputChange}
//           placeholder="Enter post content"
//           className="post-input"
//         />
//         <button type="submit" className="post-button">
//           Submit
//         </button>
//       </form>

//       <h2 className="post-heading">Posts:</h2>
//       <div className="post-list" onScroll={handleScroll} ref={postListRef}>
//         <div>
//           {posts.map((post) => (
//             <div key={post._id} className="post-item">
//               {post.content}
//             </div>
//           ))}
//         </div>
//         {!loading && !hasMorePosts && (
//           <div className="no-more-posts">No more posts to render.</div>
//         )}
//         {loading && (
//           <div className="loading-animation">
//             <img
//               src="https://i.gifer.com/origin/34/34338d26023e5515f6cc8969aa027bca_w200.gif"
//               alt="Loading"
//             />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Feed;
