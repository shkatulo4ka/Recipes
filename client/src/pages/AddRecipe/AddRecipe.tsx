import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Row } from "antd";

import Layout from "../../components/layout/Layout";
import RecipeForm from "../RecipeForm/RecipeForm";
import { selectUser } from "../../features/auth/authSlice";
import { RecipeData, useAddRecipeMutation } from "../../app/services/recipes";
import { Paths } from "../../paths";
import { isErrorWithMessage } from "../../utils/is-error-with-message";

const AddRecipe = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [addRecipe] = useAddRecipeMutation();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [navigate, user]);

  const handleAddRecipe = async ({ name, description, kkal, categoryID }: RecipeData) => {
    console.log(name, description, kkal, categoryID);

    try {
      await addRecipe({ name, description, kkal: Number(kkal) }).unwrap();
      navigate(`${Paths.status}/created`);
    } catch (error) {
      const isError = isErrorWithMessage(error);

      if (isError) {
        setError(error.data.message);
      } else {
        setError("Неизвестная ошибка");
      }
    }
  };
  return (
    <Layout>
      <Row align="middle" justify="center">
        <RecipeForm title="Добавить рецепт" btnText="Добавить" onFinish={handleAddRecipe} error={error} />
      </Row>
    </Layout>
  );
};

export default AddRecipe;
