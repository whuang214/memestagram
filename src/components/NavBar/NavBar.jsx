import { InstagramOutlined, PlusOutlined } from "@ant-design/icons";
import userService from "../../utils/userService";
import { Button, Space } from "antd";
import { Link } from "react-router-dom";

export default function NavBar({ currentUser, onAddPost }) {
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

        <div>
          <Button
            type="primary"
            shape="circle"
            icon={<PlusOutlined />}
            size="large"
            onClick={onAddPost}
          />
          <Link to={`/user/${currentUser.username}`}>Profile</Link>
          <Button
            type="link"
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
