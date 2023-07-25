import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../../utils/userService";
import { Form, Input, Button, Card, Upload, Avatar, message } from "antd";
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { set } from "mongoose";

const { TextArea } = Input;

export default function SignupPage({ onSignupOrLogin }) {
  const navigate = useNavigate();

  const [formObj, setFormObj] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [file, setFile] = useState(null); // for antd upload
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function beforeUpload(file) {
    // is the fie type an image?
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file types!");
      return false;
    }
    // is the file size < 2mb?
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must be smaller than 2MB!");
      return false;
    }
    return false; // added this to prevent upload b/c going to handle it manually
  }

  function handleFileChange(info) {
    // check if empty
    if (info.file.status === "removed") {
      setFile(null);
      message.success(`file removed`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    } else {
      setFile(info.file); // add the file to the fileList
      message.success(`${info.file.name} sucessfully uploaded`);
    }
  }

  function handleChange(e) {
    setFormObj((prevFormObj) => ({
      ...prevFormObj,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit(values) {
    message.loading("Signing up...", 0);

    const formData = new FormData();
    for (let key in formObj) {
      formData.append(key, formObj[key]);
    }
    if (file) {
      formData.append("image", file);
    }
    setLoading(true);
    console.log("Received values of form: ", values);
    try {
      const user = await UserService.signup(formData);
      onSignupOrLogin();
      navigate("/");
    } catch (err) {
      console.log(err, "err in handlesubmit");
      message.error(err.message);
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
          <Form.Item label="Profile Image">
            <Upload
              name="image"
              listType="picture"
              beforeUpload={beforeUpload}
              onChange={handleFileChange}
              showUploadList={true}
            >
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
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
