import { Card, Space, Avatar, Image } from "antd";
import { Link } from "react-router-dom";
import moment from "moment";

export default function FeedPostCard({ post }) {
  return (
    <Card
      title={
        <Space>
          <Avatar src={post.user.photoUrl} alt={post.user.username} />
          <Link to={`/user/${post.user.username}`}>{post.user.username}</Link>
          <small>{moment(post.createdAt).fromNow()}</small>
        </Space>
      }
    >
      <Image
        style={{
          marginBottom: "20px",
        }}
        src={post.photoUrl}
        alt={post.caption}
        width={500}
      />
      <p>{post.caption}</p>
    </Card>
  );
}
