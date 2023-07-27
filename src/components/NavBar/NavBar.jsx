import { InstagramOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Space } from "antd";
import { Link } from "react-router-dom";

export default function NavBar({ onAddPost, onLogout }) {
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
        <h1
          style={{
            margin: 0,
            color: "black",
          }}
        >
          <InstagramOutlined /> Memestagram
        </h1>

        <div>
          <Button
            type="primary"
            shape="circle"
            icon={<PlusOutlined />}
            size="large"
            onClick={onAddPost}
          />
          <Link to="/profile">Profile</Link>
          <Button type="link" onClick={onLogout}>
            Logout
          </Button>
        </div>
      </Space>
    </div>
  );
}
