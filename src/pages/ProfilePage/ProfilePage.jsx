import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography, List, message } from "antd";

import NavBar from "../../components/NavBar/NavBar";
import UserProfile from "../../components/UserProfile/UserProfile";
import ProfilePostCard from "../../components/PostCard/ProfilePostCard";

import UserService from "../../utils/userService";
import PostService from "../../utils/postService";

export default function ProfilePage({ currentUser, onLogout }) {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const { username } = useParams();

  useEffect(() => {
    async function getUserAndPosts() {
      try {
        message.loading({ content: "Loading...", key: "loading" });
        setIsLoading(true);
        const profile = await UserService.getProfile(username);
        const userPosts = await PostService.getUserPosts(profile._id);
        setUser(profile);
        setPosts(userPosts.data);
        setIsLoading(false);
        message.destroy("loading");
      } catch (err) {
        console.log(err, "<- err in getUserAndPosts");
      }
    }
    getUserAndPosts();
  }, [username]);

  if (isLoading) {
    return (
      <>
        <NavBar currentUser={currentUser} />
        <p>Loading...</p>
      </>
    );
  }

  return (
    <>
      <NavBar currentUser={currentUser} />
      <div
        style={{
          padding: "20px",
          textAlign: "center",
          marginTop: "50px",
        }}
      >
        <UserProfile user={user} />

        <div style={{ marginTop: "30px" }}>
          <Typography.Title level={4} style={{ color: "#fff" }}>
            Posts
          </Typography.Title>
          <List
            grid={{ gutter: 16, column: 3 }}
            dataSource={posts}
            renderItem={(item) => <ProfilePostCard post={item} />}
          />
        </div>
      </div>
    </>
  );
}
