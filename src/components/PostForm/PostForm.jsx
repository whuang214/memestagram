import { Modal, Form, Input, Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useState } from "react";

export default function PostFormModal({ isModelOpen, onCancel, onPostSubmit }) {
  const [caption, setCaption] = useState("");
  const [fileList, setFileList] = useState([]); // for antd upload

  // when users click on the submit button
  const handleOk = async () => {
    const values = await form.validateFields();
    onPostSubmit(values);
    form.resetFields();
  };

  // handle input change
  const handleCaptionChange = (e) => {
    setCaption(e.target.value);
  };

  function beforeUpload(file) {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file types!");
      return false;
    }
    message.success("Image uploaded successfully!");
    setFileList([file]);

    return false; // Prevent automatic upload since we'll handle it ourselves
  }

  const handleFileChange = (info) => {
    const { file } = info;

    console.log(file);
    if (file.status === "removed") {
      setFileList([]);
      message.success(`file removed`);
    } else if (file.status === "error") {
      message.error(`${file.name} file upload failed.`);
    }
  };

  return (
    <Modal
      title="Make a New Post"
      open={isModelOpen}
      onOk={handleOk}
      onCancel={onCancel}
    >
      <Form>
        <Form.Item
          label="Caption"
          name="caption"
          value={caption}
          onChange={handleCaptionChange}
          rules={[{ required: true, message: "Please input the caption!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Upload Image"
          rules={[{ required: true, message: "Please upload the image!" }]}
        >
          <Upload
            name="image"
            listType="picture"
            showUploadList={true}
            beforeUpload={beforeUpload}
            onChange={handleFileChange}
            fileList={fileList}
          >
            <Button icon={<UploadOutlined />}>Click to upload an Image</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
}
