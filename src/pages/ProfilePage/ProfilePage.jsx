import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography, List, message } from "antd";

import NavBar from "../../components/NavBar/NavBar";
import UserProfile from "../../components/UserProfile/UserProfile";
import PlaceholderCard from "../../components/PostCard/PlaceholderCard";
import ProfilePostCard from "../../components/PostCard/ProfilePostCard";

import UserService from "../../utils/userService";
import PostService from "../../utils/postService";
import { set } from "mongoose";

export default function ProfilePage({ currentUser, onLogout }) {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const { username } = useParams();

  // placeholder testing
  const placeholderCount =
    3 - (posts.length % 3) === 3 ? 0 : 3 - (posts.length % 3);
  const placeholders = [...Array(placeholderCount)].map((_, idx) => ({
    placeholderKey: idx,
  }));
  const displayItems = [...posts, ...placeholders]; // merge posts and placeholders

  useEffect(() => {
    async function getUserAndPosts() {
      try {
        message.loading({ content: "Loading...", key: "loading" });
        setIsLoading(true);
        const profile = await UserService.getProfile(username);
        const userPosts = await PostService.getUserPosts(profile._id);
        // console.log("profile->", profile);
        // console.log("userPosts->", userPosts);
        setUser(profile);
        setPosts(userPosts.data);
        setIsLoading(false);
        message.destroy("loading");
      } catch (err) {
        console.log(err, "<- err in getUserAndPosts");
      }
    }
    getUserAndPosts();
  }, [username]); // Ensure that the useEffect reruns if the username parameter changes

  // if not loaded yet run message.loading and stop after
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
      {message.destroy()}
      <NavBar currentUser={currentUser} />
      <div style={{ padding: "20px", textAlign: "center", marginTop: "260px" }}>
        <UserProfile user={user} />

        {/* User Posts */}
        <div style={{ marginTop: "30px" }}>
          <Typography.Title
            level={4}
            style={{
              color: "#fff",
            }}
          >
            Posts
          </Typography.Title>
          <List
            grid={{ gutter: 16, column: 3 }}
            dataSource={displayItems}
            renderItem={(item, index) => {
              if (item?.placeholderKey !== undefined) {
                return <PlaceholderCard placeholderKey={item.placeholderKey} />;
              }
              return <ProfilePostCard post={item} />;
            }}
          />
        </div>
      </div>
    </>
  );
}
