import { Select, Form } from "antd";
import { FC } from "react";

interface ISelectCategory {
  name: string;
  options: {
    value: string;
    label: string;
  }[];
}

const SelectCategory: FC<ISelectCategory> = ({ name, options }) => {
  return (
    <Form.Item name={name}>
      <Select style={{ width: "27rem" }} allowClear={true} placeholder="Выбери категорию" options={options} />
    </Form.Item>
  );
};

export default SelectCategory;
