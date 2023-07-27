import { Modal, Form, Input, Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useState } from "react";

export default function PostFormModal({ isModelOpen, onCancel, onPostSubmit }) {
  const [formObj, setFormObj] = useState({
    caption: "",
  });
  const [file, setFile] = useState(null); // for antd upload

  function beforeUpload(file) {
    return false;
  }

  function handleChange(e) {
    setFormObj((prevFormObj) => ({
      ...prevFormObj,
      [e.target.name]: e.target.value,
    }));
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

  function handleOk() {
    const formData = new FormData();
    for (let key in formObj) {
      formData.append(key, formObj[key]);
    }
    if (file) {
      formData.append("photo", file);
    }
    console.log(formData);
    onPostSubmit(formData);
  }

  return (
    <Modal
      title="Make a New Post"
      open={isModelOpen} // changed 'open' to 'visible' which is the correct prop for AntD Modal
      onOk={handleOk}
      onCancel={onCancel}
    >
      <Form>
        <Form.Item
          label="Caption"
          name="caption"
          rules={[{ required: true, message: "Please input the caption!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Upload Image"
          rules={[{ required: true, message: "Please upload the image!" }]}
          valuePropName="fileList" // bind fileList to Form.Item
          getValueFromEvent={(e) => e.fileList} // update value based on event
        >
          <Upload
            name="image"
            listType="picture"
            showUploadList={true}
            beforeUpload={beforeUpload}
            onChange={handleFileChange}
          >
            <Button icon={<UploadOutlined />}>Click to upload an Image</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
}
