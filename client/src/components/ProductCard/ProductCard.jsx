import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Avatar, Card } from "antd";
const { Meta } = Card;

export default function ProductCard({data}) {
  console.log(data);
  return (
    <Card
      style={{ width: 300 }}
      cover={
        <img
          alt="example"
          style={{width:"100%",height:"200px",objectFit:"cover"}}
          src={'http://localhost:5000/uploads/'+data.file}
        />
      }
      actions={[
        <SettingOutlined key="setting" />,
        <EditOutlined key="edit" />,
        <EllipsisOutlined key="ellipsis" />,
      ]}
    >
      <Meta
        title={data.name}
        description={data.detail + " ราคา " + data.price}
      />
    </Card>
  );
}
