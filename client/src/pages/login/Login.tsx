import React from 'react'
import Layout from '../../components/layout/Layout'
import { Card, Form, Row } from 'antd'

export const Login = () => {
  return (
    <Layout>
        <Row align='middle' justify='center'>
          <Card title='Войти' style={{width: "30rem"}}>
            <Form onFinish={() => null}>

            </Form>
          </Card>
        </Row>
    </Layout>
    
  )
}

export default Login