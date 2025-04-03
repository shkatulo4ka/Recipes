
import { Card, Form, Space} from "antd";
import Input from "../../components/Input/Input";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Button from "../../components/button/Button";
import {RecipeData } from "../../app/services/recipes";
import { useGetAllCategoriesQuery } from '../../app/services/categories';
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
    const {data, isLoading} = useGetAllCategoriesQuery();
    const options = data?.map(category => ({
        value: category.id,
        label: category.name
    })) || [];

  return (
    <Card title={title} style={{width:"30rem"}}>
        <Form name = "recipe-form"
            onFinish={onFinish}
            initialValues={recipe}>
                <Input type="text" name="name" placeholder="Название"/>
                
                {isLoading ? <div>...</div> : <SelectCategory name="categoryID" options={options}/>}

                <Input type="text" name="description" placeholder="Приготовление"/>
                
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