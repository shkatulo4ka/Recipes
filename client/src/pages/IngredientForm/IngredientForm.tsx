import { Card, Form, Space } from "antd";
import Input from "../../components/Input/Input";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Button from "../../components/button/Button";
import { IngredientData } from "../../app/services/ingredients";

type Props<T> = {
  onFinish: (values: T) => void;
  btnText: string;
  title: string;
  error?: string;
  ingredient?: T;
};
const IngredientForm = ({ onFinish, title, btnText, error, ingredient }: Props<IngredientData>) => {
  return (
    <Card title={title} style={{ width: "30rem" }}>
      <Form name="ingredient-form" onFinish={onFinish} initialValues={ingredient}>
        <Input type="text" name="name" placeholder="Название" />
        <Input type="number" name="price" placeholder="Стоимость" />
        <Input type="number" name="kkal" placeholder="Ккал" />
        <Space>
          <ErrorMessage message={error} />
          <Button htmlType="submit">{btnText}</Button>
        </Space>
      </Form>
    </Card>
  );
};

export default IngredientForm;
