import { Card, Avatar, Typography } from "antd";
import moment from "moment";

export default function UserProfile({ user }) {
  return (
    <Card
      style={{
        marginBottom: "30px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Avatar size={150} src={user.photoUrl} alt={user.username} />
      <Typography.Title level={2}>{user.username}</Typography.Title>
      <Typography.Text type="secondary">{user.email}</Typography.Text>
      <Typography.Text style={{ display: "block", margin: "10px 0" }}>
        Joined {moment(user.createdAt).format("MMM D, YYYY")}
      </Typography.Text>
    </Card>
  );
}
