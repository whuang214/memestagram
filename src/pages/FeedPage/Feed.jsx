import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { List, Card, Image, Space, Avatar, message } from "antd";
import NavBar from "../../components/NavBar/NavBar";

import "./feed.css";

import PostForm from "../../components/PostForm/PostForm";
import PostService from "../../utils/postService";
import moment from "moment"; // for displaying the time

export default function Feed({ onLogout }) {
  /* example data
  const users = [
    {
      _id: "1",
      username: "User1",
      email: "user1@example.com",
      photoUrl: "https://via.placeholder.com/50",
    },
    {
      _id: "2",
      username: "User2",
      email: "user2@example.com",
      photoUrl: "https://via.placeholder.com/50",
    },
  ];

  const [posts, setPosts] = useState([
    {
      user: users[0],
      photoUrl: "https://via.placeholder.com/500",
      caption: "This is the content for post 1.",
    },
    {
      user: users[1],
      photoUrl: "https://via.placeholder.com/500",
      caption: "This is the content for post 2.",
    },
  ]);
  */
  const [posts, setPosts] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const fetchPosts = async () => {
    try {
      message.loading("Fetching posts...");
      const posts = await PostService.getAll();
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
      <NavBar onAddPost={togglePostModal} onLogout={onLogout} />

      <List
        itemLayout="vertical"
        size="large"
        dataSource={posts}
        renderItem={(post) => (
          <List.Item>
            <Card
              title={
                <Space>
                  <Avatar src={post.user.photoUrl} alt={post.user.username} />
                  <Link to={`/user/${post.user.username}`}>
                    {post.user.username}
                  </Link>
                  <small>{moment(post.createdAt).fromNow()}</small>
                </Space>
              }
            >
              <Image src={post.photoUrl} alt={post.caption} width={500} />
              <p>{post.caption}</p>
            </Card>
          </List.Item>
        )}
      />

      <PostForm
        isModelOpen={isModalVisible}
        onCancel={togglePostModal}
        onPostSubmit={handlePostSubmit}
      />
    </div>
  );
}
