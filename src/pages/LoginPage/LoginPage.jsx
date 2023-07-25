import { useState } from "react";
import { Form, Input, Button, Card } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "../LoginPage.css";

export default function LoginPage() {
  const [formObj, setFormObj] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    setFormObj((prevFormObj) => ({
      ...prevFormObj,
      [e.target.name]: e.target.value,
    }));
  }

  function handleSubmit(values) {
    setLoading(true);
    console.log("Received values of form: ", values);
    setLoading(false);
  }

  return (
    <div className="login-container">
      <Card title="Login" className="login-card">
        {error && <div className="error-message">{error}</div>}
        <Form
          name="normal_login"
          className="login-form"
          onFinish={handleSubmit}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
            <Input
              name="username"
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
              value={formObj.username}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              name="password"
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
              value={formObj.password}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              loading={loading}
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
