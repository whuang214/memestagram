import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import userService from "../../utils/userService";

export default function ProfilePage({ currentUser }) {
  const [user, setUser] = useState(null);
  const { username } = useParams();

  useEffect(() => {
    async function getUser() {
      const profile = await userService.getProfile(username);
      console.log("profile->", profile);
      setUser(profile.user);
    }
    getUser();
  });

  return (
    <div>
      <h1>Profile Page</h1>
    </div>
  );
}
