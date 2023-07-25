import React, { useState } from "react";
import { Form, Input, Button, Card, Upload, Avatar } from "antd";
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  NumberOutlined,
} from "@ant-design/icons";

const { TextArea } = Input;

export default function SignupPage() {
  const [loading, setLoading] = useState(false);

  function onFinish(values) {
    setLoading(true);
    console.log("Received values of form: ", values);
    setLoading(false);
  }

  return (
    <div className="login-container">
      <Card title="Signup" className="signup-card">
        <Form
          name="normal_signup"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
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
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
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
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Confirm Password"
            />
          </Form.Item>
          <Form.Item
            name="age"
            rules={[{ required: true, message: "Please input your Age!" }]}
          >
            <Input
              prefix={<NumberOutlined className="site-form-item-icon" />}
              type="number"
              placeholder="Age"
            />
          </Form.Item>
          <Form.Item
            name="bio"
            rules={[{ required: true, message: "Please input your Bio!" }]}
          >
            <TextArea placeholder="Bio" rows={3} />
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
