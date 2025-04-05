import { Form, Input as AntInput } from "antd";

type Props = {
  name: string;
  placeholder: string;
  type?: string;
};

const Input = ({ name, placeholder, type = "text" }: Props) => {
  return (
    <Form.Item name={name} rules={[{ required: true, message: "Обязательное поле" }]} shouldUpdate={true}>
      <AntInput placeholder={placeholder} type={type} size="large" />
    </Form.Item>
  );
};

export default Input;
