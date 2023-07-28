import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import "./addPostButton.css";

export default function AddPostButton({ onClick }) {
  return (
    <Button
      type="primary"
      shape="circle"
      icon={<PlusOutlined />}
      size="large"
      onClick={onClick}
      className="add-post-button"
    />
  );
}
