import { List, Card, Image } from "antd";
import { InstagramOutlined } from "@ant-design/icons";
import "./feed.css";

export default function Feed() {
  const sampleData = [
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
  ];

  return (
    <div className="feed-container">
      <h1>
        <InstagramOutlined /> Memestagram
      </h1>
      <List
        itemLayout="vertical"
        size="large"
        dataSource={sampleData}
        renderItem={(item) => (
          <List.Item>
            <Card title={item.title}>
              <Image src={item.imageUrl} alt={item.title} width={500} />
              <p>{item.content}</p>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
}
