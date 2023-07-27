import { Button, List, Card, Image, Space, Avatar, message } from "antd";
import { InstagramOutlined, PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import PostForm from "../../components/PostForm/PostForm";
import * as postService from "../../utils/postService";
import "./feed.css";

export default function Feed() {
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

  const togglePostModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handlePostSubmit = async (values) => {
    try {
      const newPost = await postService.create(values);
      setPosts((prevPosts) => [newPost, ...prevPosts]);
      setIsModalVisible(false); // close modal
      message.success("Post created successfully!");
    } catch (err) {
      console.log(err, "<- err in submitting a post");
      message.error(err.message);
    }
  };

  return (
    <div className="feed-container">
      <div className="navbar">
        <Space
          align="center"
          size="large"
          style={{
            width: "100%",
            justifyContent: "space-between",
            align: "center",
          }}
        >
          <h1
            style={{
              margin: 0,
              color: "black",
            }}
          >
            <InstagramOutlined /> Memestagram
          </h1>

          <Button
            type="primary"
            shape="circle"
            icon={<PlusOutlined />}
            size="large"
            onClick={togglePostModal}
          />
        </Space>
      </div>

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
                  {post.user.username}
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
