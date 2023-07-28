import { useState, useEffect } from "react";
import { List, message } from "antd";

import NavBar from "../../components/NavBar/NavBar";
import PostForm from "../../components/PostForm/PostForm";
import FeedPostCard from "../../components/PostCard/FeedPostCard";
import AddPostButton from "../../components/PostForm/AddPostButton";
import postService from "../../utils/postService";

import "./feed.css";

export default function Feed({ currentUser }) {
  const [posts, setPosts] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const fetchPosts = async () => {
    try {
      message.loading("Fetching posts...");
      const posts = await postService.getAll();
      console.log(posts, "<- posts");
      setPosts(posts.data);
      message.destroy(); // destroy loading message
    } catch (err) {
      console.log(err, "<- err in fetching posts");
    }
  };

  const togglePostModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handlePostSubmit = async (values) => {
    try {
      setIsModalVisible(false); // close modal
      message.loading("Creating post...");
      const newPost = await postService.create(values);
      message.destroy(); // destroy loading message
      setPosts([newPost.data, ...posts]); // update posts
      message.success("Post created successfully!");
    } catch (err) {
      console.log(err, "<- err in submitting a post");
      message.error(err.message);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="feed-container">
      <NavBar currentUser={currentUser} onAddPost={togglePostModal} />

      <List
        itemLayout="vertical"
        size="large"
        dataSource={posts}
        renderItem={(post) => (
          <List.Item>
            <FeedPostCard post={post} />
          </List.Item>
        )}
      />

      <PostForm
        isModelOpen={isModalVisible}
        onCancel={togglePostModal}
        onPostSubmit={handlePostSubmit}
      />

      <AddPostButton onClick={togglePostModal} />
    </div>
  );
}
