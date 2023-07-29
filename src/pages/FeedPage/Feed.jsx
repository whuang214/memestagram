import { useState, useEffect } from "react";
import { List, message } from "antd";

import NavBar from "../../components/NavBar/NavBar";
import PostForm from "../../components/PostForm/PostForm";
import FeedPostCard from "../../components/PostCard/FeedPostCard";
import AddPostButton from "../../components/PostForm/AddPostButton";
import postService from "../../utils/postService";
import likeService from "../../utils/likeService";

import "./feed.css";

export default function Feed({ currentUser }) {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const fetchPosts = async () => {
    message.loading({ content: "Refreshing posts...", key: "fetchingPosts" });
    try {
      const posts = await postService.getAll();
      // console.log(posts, "<- posts");
      setPosts(posts.data);
    } catch (err) {
      console.log(err, "<- err in fetching posts");
    }
    message.destroy("fetchingPosts"); // destroy loading message
  };

  const togglePostModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleLike = async (postId, likeBoolean) => {
    try {
      if (likeBoolean) {
        message.loading({ content: "Liking post...", key: "loadinglike" });
        await likeService.addLike(postId);
      }
      if (!likeBoolean) {
        message.loading({ content: "Unliking post...", key: "loadinglike" });
        await likeService.removeLike(postId);
      }
      // update posts so the child component will re-render
      fetchPosts();
    } catch (err) {
      console.log(err, "<- err in liking a post");
    }
    message.destroy("loadinglike"); // destroy loading message
  };

  const handleDelete = async (postId) => {
    try {
      message.loading({ content: "Deleting post...", key: "deletingPost" });
      await postService.deletePost(postId);
      fetchPosts();
      message.success("Post deleted successfully!");
    } catch (err) {
      console.log(err, "<- err in deleting a post");
    }
    message.destroy("deletingPost"); // destroy loading message
  };

  const handlePostSubmit = async (values) => {
    try {
      setIsModalVisible(false); // close modal
      message.loading({ content: "Creating post...", key: "creatingPost" });
      const newPost = await postService.create(values);
      message.destroy("creatingPost"); // destroy loading message
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
            <FeedPostCard
              post={post}
              currentUser={currentUser}
              onLike={handleLike}
              onDelete={handleDelete}
            />
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
