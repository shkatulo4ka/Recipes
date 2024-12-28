import React, { useEffect, useState } from 'react'
import Layout from '../../components/layout/Layout'
import { Row } from 'antd'
import IngredientForm from '../../components/IngredientForm/IngredientForm'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUser } from '../../features/auth/authSlice'
import { useAddIngredientMutation } from '../../app/services/ingredients'
import { Ingredient } from '@prisma/client'
import { Paths } from '../../paths'
import { isErrorWithMessage } from '../../utils/is-error-with-message'

const AddIngredient = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [addIngredient] = useAddIngredientMutation();

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [navigate, user])

  const handleAddIngredient = async (data: Ingredient) => {
    try {
      await addIngredient(data).unwrap();
      navigate(`${Paths.status}/created`)
    } catch (error) {
      const isError = isErrorWithMessage(error);

      if (isError) {
        setError(error.data.message)
      } else {
        setError("Неизвестная ошибка")
      }
    }
  }
  return (
    <Layout>
      <Row align='middle' justify='center'>
        <IngredientForm
          title='Добавить ингредиент'
          btnText='Добавить'
          onFinish={handleAddIngredient}
          error={error}
        />
      </Row>
    </Layout>
  )
}

export default AddIngredient