import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { PlusCircleOutlined } from "@ant-design/icons";

import { Ingredient } from "@prisma/client";
import Button from "../../components/button/Button";
import Layout from "../../components/layout/Layout";
import { useGetAllIngredientsQuery } from "../../app/services/ingredients";
import { selectUser } from "../../features/auth/authSlice";

// todo: move to constants
const ingredientsColumns: ColumnsType<Ingredient> = [
  {
    title: "Продукт",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Стоимость",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "Ккал",
    dataIndex: "kkal",
    key: "kkal",
  },
];

const Ingredients = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const { data } = useGetAllIngredientsQuery();
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [navigate, user]);

  return (
    <Layout>
      <Button type="primary" onClick={() => navigate("/ingredients/add")} icon={<PlusCircleOutlined />}>
        Добавить
      </Button>
      <Table columns={ingredientsColumns} rowKey={(record) => record.id} pagination={false} dataSource={data} />
    </Layout>
  );
};

export default Ingredients;
