import { Recipe } from "@prisma/client";
import { Card, Form, Space, Row } from "antd";
import Input from "../../components/Input/Input";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Button from "../../components/button/Button";
import {RecipeData } from "../../app/services/recipes";
import SelectCategory from "../../components/SelectCategory/SelectCategory";

type Props<T> = {
    onFinish: (values: T) => void;
    btnText: string;
    title: string;
    error?: string;
    recipe?: T
}
const RecipeForm = ({
    onFinish,
    title,
    btnText,
    error,
    recipe
}: Props<RecipeData>) => {
  return (
    <Card title={title} style={{width:"30rem"}}>
        <Form name = "recipe-form"
            onFinish={onFinish}
            initialValues={recipe}>
                <Input type="text" name="name" placeholder="Название"/>
                
                <SelectCategory name="category"/>
                
                <Space>
                    <ErrorMessage message={error}/>
                    <Button htmlType="submit">
                        {btnText}
                    </Button>
                </Space>
        </Form>
    </Card>
  )
}

export default RecipeForm