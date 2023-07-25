import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../../utils/userService";
import { Form, Input, Button, Card, Upload, Avatar } from "antd";
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  NumberOutlined,
} from "@ant-design/icons";

const { TextArea } = Input;

export default function SignupPage({ onSignupOrLogin }) {
  const navigate = useNavigate();

  const [formObj, setFormObj] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    age: "",
    bio: "",
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
      const user = await UserService.signup(formObj);
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
      <Card title="Signup" className="signup-card">
        {error && <div className="error-message">{error}</div>}
        <Form
          name="normal_signup"
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
            name="email"
            rules={[
              { type: "email", message: "The input is not valid E-mail!" },
              { required: true, message: "Please input your E-mail!" },
            ]}
          >
            <Input
              name="email"
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder="Email"
              value={formObj.email}
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
          <Form.Item
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Please confirm your password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              }),
            ]}
          >
            <Input
              name="confirmPassword"
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Confirm Password"
              value={formObj.confirmPassword}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item
            name="age"
            rules={[{ required: true, message: "Please input your Age!" }]}
          >
            <Input
              name="age"
              prefix={<NumberOutlined className="site-form-item-icon" />}
              type="number"
              placeholder="Age"
              value={formObj.age}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item
            name="bio"
            rules={[{ required: true, message: "Please input your Bio!" }]}
          >
            <TextArea
              name="bio"
              placeholder="Bio"
              rows={3}
              value={formObj.bio}
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
              Sign up
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
