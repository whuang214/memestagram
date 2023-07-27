import { Modal, Form, Input, Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useState } from "react";

export default function PostFormModal({ isModelOpen, onCancel, onPostSubmit }) {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]); // for antd upload

  // when users click on the submit button
  const handleOk = async () => {
    const values = await form.validateFields();
    console.log(fileList[0].originFileObj, "<- file we are sending");
    const formData = new FormData();
    formData.append("caption", form.getFieldValue("caption"));
    formData.append("photo", fileList[0].originFileObj);
    onPostSubmit(formData);
    form.resetFields();
    setFileList([]);
  };

  // handle input change
  const handleCaptionChange = (e) => {
    setCaption(e.target.value);
  };

  function beforeUpload(file) {
    if (fileList.length > 0) {
      message.info("File replaced!");
      setFileList([]);
    }
    return false; // Prevent automatic upload since we'll handle it ourselves
  }

  const handleFileChange = (info) => {
    const { file } = info;

    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file types!");
    }
    // else if (file.size / 1024 / 1024 > 2) {
    //   message.error("Image must be smaller than 2MB!");
    // }
    else {
      setFileList([...info.fileList]); // set the fileList

      console.log(file);
      if (file.status === "removed") {
        setFileList([]);
        message.success(`file removed`);
      } else if (file.status === "error") {
        message.error(`${file.name} file upload failed.`);
      }
    }
  };

  return (
    <Modal
      title="Make a New Post"
      open={isModelOpen}
      onOk={handleOk}
      onCancel={onCancel}
    >
      <Form form={form}>
        <Form.Item
          label="Upload Image"
          rules={[{ required: true, message: "Please upload the image!" }]}
        >
          <Upload
            name="image"
            listType="picture"
            showUploadList={true}
            multiple={false}
            accept=".jpg,.jpeg,.png"
            beforeUpload={beforeUpload}
            onChange={handleFileChange}
            fileList={fileList}
          >
            <Button icon={<UploadOutlined />}>Click to upload an Image</Button>
          </Upload>
        </Form.Item>
        <Form.Item
          label="Caption"
          name="caption"
          rules={[{ required: true, message: "Please input the caption!" }]}
        >
          <Input placeholder="Enter caption" />
        </Form.Item>
      </Form>
    </Modal>
  );
}
