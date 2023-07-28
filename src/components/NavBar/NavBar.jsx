import { InstagramOutlined } from "@ant-design/icons";
import userService from "../../utils/userService";
import { Avatar, Button, Space } from "antd";
import { Link } from "react-router-dom";

import "./navbar.css";

export default function NavBar({ currentUser }) {
  return (
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
        <h1 style={{ margin: 0, color: "black" }}>
          <Link to="/" style={{ color: "black", textDecoration: "none" }}>
            <InstagramOutlined /> Memestagram
          </Link>
        </h1>

        <div className="navbar-right">
          <div>
            <Avatar src={currentUser.photoUrl} />
            <span style={{ color: "black" }}>{currentUser.username}</span>
          </div>
          <Link to={`/user/${currentUser.username}`}>My Profile</Link>
          <Button
            type="link"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={() => {
              userService.logout();
              window.location.reload();
            }}
          >
            Logout
          </Button>
        </div>
      </Space>
    </div>
  );
}
