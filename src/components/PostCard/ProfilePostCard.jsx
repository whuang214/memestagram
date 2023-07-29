import { Card, Image, List, Typography, Space } from "antd";
import { HeartFilled, HeartOutlined, DeleteOutlined } from "@ant-design/icons";
import likeService from "../../utils/likeService";
import postService from "../../utils/postService";
import { message } from "antd";
import moment from "moment";

export default function ProfilePostCard({ post, currentUser, fetchPosts }) {
  const hasLiked = post.likes.some(
    (like) => like._id.toString() === currentUser._id.toString()
  );

  // set like to likeBoolean (true of setting to like)
  const handleLike = async (postId, likeBoolean) => {
    try {
      if (likeBoolean) {
        message.loading({ content: "Liking post...", key: "loadinglike" });
        await likeService.addLike(postId);
      } else {
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

  const actions = [
    <Space style={{ fontSize: "20px" }}>
      {hasLiked ? (
        <HeartFilled
          style={{ color: "red" }}
          onClick={() => handleLike(post._id, !hasLiked)}
        />
      ) : (
        <HeartOutlined onClick={() => handleLike(post._id, !hasLiked)} />
      )}
      <span>{post.likes.length}</span>
    </Space>,
  ];

  // Add delete action if user is the post's owner
  if (currentUser._id === post.user._id) {
    actions.push(
      <DeleteOutlined
        style={{ fontSize: "20px" }}
        onClick={() => handleDelete(post._id)}
      />
    );
  }

  return (
    <List.Item key={post._id}>
      <Card actions={actions}>
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
        <small>Created {moment(post.createdAt).fromNow()}</small>
      </Card>
    </List.Item>
  );
}
