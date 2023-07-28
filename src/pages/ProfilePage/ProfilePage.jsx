import { Card, Avatar, Space, Typography, List, Image } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserService from "../../utils/userService";
import PostService from "../../utils/postService";
import moment from "moment";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const { username } = useParams();

  useEffect(() => {
    async function getUserAndPosts() {
      try {
        const profile = await UserService.getProfile(username);
        const userPosts = await PostService.getUserPosts(profile._id);
        console.log("profile->", profile);
        console.log("userPosts->", userPosts);
        setUser(profile);
        setPosts(userPosts.data);
      } catch (err) {
        console.log(err, "<- err in getUserAndPosts");
      }
    }
    getUserAndPosts();
  }, [username]); // Ensure that the useEffect reruns if the username parameter changes

  if (!user) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      {/* User Details inside a Card */}
      <Card
        style={{
          marginBottom: "30px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Avatar size={150} src={user.photoUrl} alt={user.username} />
        <Typography.Title level={2}>{user.username}</Typography.Title>
        <Typography.Text type="secondary">{user.email}</Typography.Text>
        <Typography.Text style={{ display: "block", margin: "10px 0" }}>
          Joined {moment(user.createdAt).format("MMM D, YYYY")}
        </Typography.Text>
      </Card>

      {/* User Posts */}
      <div style={{ marginTop: "30px" }}>
        <Typography.Title level={4}>Posts</Typography.Title>
        <List
          grid={{ gutter: 16, column: 3 }}
          dataSource={posts}
          renderItem={(post) => (
            <List.Item>
              <Card>
                <Image
                  src={post.photoUrl}
                  alt={post.caption}
                  style={{ maxHeight: "200px", objectFit: "cover" }}
                />
                <Typography.Paragraph>{post.caption}</Typography.Paragraph>
              </Card>
            </List.Item>
          )}
        />
      </div>
    </div>
  );
}
