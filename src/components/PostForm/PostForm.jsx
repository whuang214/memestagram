import { Modal, Form, Input } from "antd";
import { useState } from "react";

export default function PostFormModal({ isModelOpen, onCancel, onPostSubmit }) {
  const handleOk = () => {
    // Handle the submission logic here, then...
    onPostSubmit(); // This can be a callback to update the parent component
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
          label="Title"
          name="title"
          rules={[{ required: true, message: "Please input the title!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Content"
          name="content"
          rules={[{ required: true, message: "Please input the content!" }]}
        >
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
}
