import { Table } from "antd";
import Button from "../../components/button/Button"
import Layout from "../../components/layout/Layout"
import {PlusCircleOutlined} from "@ant-design/icons";
import { useGetAllRecipesQuery } from "../../app/services/recipes";
import { ColumnsType } from "antd/es/table";
import { Recipe, Ingredient } from "@prisma/client";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/auth/authSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

type RecipeExtra = Recipe & {
    ingredients: Ingredient[]
}

const recipeColumns: ColumnsType<Recipe> = [
    {
        title: "Название",
        dataIndex: "name",
        key: 'name'
    },
    {
        title: "Ингредиенты",
        dataIndex: "ingredients",
        key: 'ingredients',
        render: (i: Ingredient[]) => {
            console.log(i);
            return <>{
                //@ts-ignore
                i.map(f => f.ingredient.name).join(', ')
            }</>
        }
    },
    {
        title: "Приготовление",
        dataIndex: "description",
        key: 'description'
    },
]

const Recipes = () => {
    const navigate = useNavigate();
    const user = useSelector(selectUser)
    const { data, isLoading} = useGetAllRecipesQuery();
    useEffect(() => {
        if (!user) {
            navigate('/login')
        }
    }, [navigate, user])
  return (
    <Layout>
      <Button type="primary" onClick={ () => navigate('/recipe/add')} icon={ <PlusCircleOutlined />}>
          Добавить
      </Button>
        <Table
            loading = {isLoading}
            dataSource={data}
            pagination= {false}
            columns = {recipeColumns}
            rowKey= { (record) => record.id}
            onRow={(record) => {
                return {
                    onClick: () => null
                }
            }}
        />
    </Layout>
  )
}

export default Recipes