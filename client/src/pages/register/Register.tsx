import React from 'react'
import Layout from '../../components/layout/Layout'
import { Card, Form, Row, Space, Typography } from 'antd'
import Input from '../../components/Input/Input'
import PassInput from '../../components/passInput/PassInput'
import Button from '../../components/button/Button'
import { Link } from 'react-router-dom'
import { Paths } from '../../paths'

export const Register = () => {
  return (
    <Layout>
        <Row align='middle' justify='center'>
          <Card title='Регистрация' style={{width: "30rem"}}>
            <Form onFinish={() => null}>
              <Input
                name='name'
                placeholder='Имя'
              />
              <Input
                type='email'
                name='email'
                placeholder='Email'
              />
              <PassInput 
                name='password'
                placeholder='Пароль'
              />
              <PassInput 
                name='confirmPassword'
                placeholder='Подтвердите пароль'
              />
              <Button
                type='primary'
                htmlType='submit'
              >Войти</Button>
            </Form>
            <Space direction='vertical' size='large'>
              <Typography.Text>
                Есть аккаунт? <Link to={Paths.login}>Войти</Link>
              </Typography.Text>
            </Space>
          </Card>
        </Row>
    </Layout>
    
  )
}

export default Register