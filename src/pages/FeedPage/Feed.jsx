import { Button, List, Card, Image, Space } from "antd";
import { InstagramOutlined, PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import PostForm from "../../components/PostForm/PostForm";
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

  const handlePostSubmit = (values) => {
    console.log(values);
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
