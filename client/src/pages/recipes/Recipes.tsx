import { Table } from "antd";
import Button from "../../components/button/Button"
import Layout from "../../components/layout/Layout"
import {PlusCircleOutlined} from "@ant-design/icons";
import { useGetAllRecipesQuery } from "../../app/services/recipes";
import { ColumnsType } from "antd/es/table";
import { Recipe } from "@prisma/client";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/auth/authSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const recipeColumns: ColumnsType<Recipe> = [
    {
        title: "Название",
        dataIndex: "name",
        key: 'name'
    },
    {
        title: "Ингредиенты",
        dataIndex: "ingredients",
        key: 'ingredients'
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
      <Button type="primary" onClick={ () => null} icon={ <PlusCircleOutlined />}>
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