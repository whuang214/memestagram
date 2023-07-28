import { Card, Image, List, Typography } from "antd";
import { HeartTwoTone } from "@ant-design/icons";

export default function ProfilePostCard({ post }) {
  return (
    <List.Item key={post._id}>
      <Card>
        <Image
          src={post.photoUrl}
          alt={post.caption}
          style={{
            width: "100%",
            maxHeight: "200px",
            objectFit: "cover",
            marginBottom: "20px",
          }}
        />
        <Typography.Paragraph>{post.caption}</Typography.Paragraph>
        <p>
          {post.likes.length} <HeartTwoTone />
        </p>
      </Card>
    </List.Item>
  );
}
