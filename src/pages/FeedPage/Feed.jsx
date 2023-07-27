import { Button, List, Card, Image, Space, message } from "antd";
import { InstagramOutlined, PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import PostForm from "../../components/PostForm/PostForm";
import * as postService from "../../utils/postService";
import "./feed.css";

export default function Feed() {
  const [posts, setPosts] = useState([
    {
      title: "Post 1",
      content: "This is the content for post 1.",
      imageUrl: "https://via.placeholder.com/500", // placeholder image
    },
    {
      title: "Post 2",
      content: "This is the content for post 2.",
      imageUrl: "https://via.placeholder.com/500",
    },
  ]);
  const [err, setErr] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const togglePostModal = () => {
    if (isModalVisible) {
      setIsModalVisible(false);
    } else {
      setIsModalVisible(true);
    }
  };

  const handlePostSubmit = async (values) => {
    // make a post request to the back-end
    // console.log(values, "<- values in handlePostSubmit");
    try {
      const newPost = await postService.create(values);
      // console.log(newPost, "<- newPost in handlePostSubmit");
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
        renderItem={(item) => (
          <List.Item>
            <Card title={item.title}>
              <Image src={item.imageUrl} alt={item.title} width={500} />
              <p>{item.content}</p>
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
