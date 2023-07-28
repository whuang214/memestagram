import { Card, Typography, List, Image } from "antd";

export default function PlaceholderCard({ placeholderKey }) {
  return (
    <List.Item key={`placeholder-${placeholderKey}`}>
      <Card style={{ visibility: "hidden" }}>
        <Image style={{ maxHeight: "200px", objectFit: "cover" }} />
        <Typography.Paragraph></Typography.Paragraph>
      </Card>
    </List.Item>
  );
}
