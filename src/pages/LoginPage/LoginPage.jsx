import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Card } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import UserService from "../../utils/userService";
import "../LoginPage.css";

export default function LoginPage({ onSignupOrLogin }) {
  const navigate = useNavigate();

  const [formObj, setFormObj] = useState({
    email: "",
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

  async function handleSubmit(values) {
    setLoading(true);
    console.log("Received values of form: ", values);
    try {
      console.log("formObj->", formObj);
      const user = await UserService.login(formObj);
      onSignupOrLogin();
      navigate("/");
    } catch (err) {
      console.log(err, "err in handlesubmit");
      setError(err.message);
    }
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
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input
              name="email"
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email"
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
