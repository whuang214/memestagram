import { Card, Space, Avatar, Image } from "antd";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import { Link } from "react-router-dom";
import moment from "moment";

export default function FeedPostCard({ post, onLike, currentUser }) {
  // check if the current user has liked the post
  // some returns true if at least one element in the array satisfies the condition
  const hasLiked = post.likes.some((like) => like._id === currentUser._id);

  return (
    <Card
      title={
        <Space>
          <Avatar src={post.user.photoUrl} alt={post.user.username} />
          <Link to={`/user/${post.user.username}`}>{post.user.username}</Link>
          <small>{moment(post.createdAt).fromNow()}</small>
        </Space>
      }
      actions={[
        <Space style={{ fontSize: "20px" }}>
          {hasLiked ? (
            <HeartFilled
              style={{ color: "red" }}
              onClick={() => onLike(post._id, !hasLiked)}
            />
          ) : (
            <HeartOutlined onClick={() => onLike(post._id, !hasLiked)} />
          )}
          <span>{post.likes.length}</span>
        </Space>,
      ]}
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
