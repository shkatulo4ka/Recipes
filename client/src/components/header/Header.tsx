import { LoginOutlined, ReadOutlined, UserOutlined } from '@ant-design/icons'
import { Layout, Space, Typography } from 'antd'
import styles from './Header.module.css'
import Button from '../button/Button'
import { Link } from 'react-router-dom'
import { Paths } from '../../paths'

const Header = () => {
  return (
    <Layout.Header className={styles.header}>
        <Space>
            <ReadOutlined className={styles.teamIcon}/>
            <Link to={Paths.home}>
              <Button type='text'>
                <Typography.Title level={1}>Рецепты</Typography.Title>
              </Button>            
            </Link>
        </Space>
        <Space>
            <Link to={Paths.register}>
              <Button type='text' icon={ <UserOutlined/> }>
                Регистрация
              </Button>            
            </Link>
            <Link to={Paths.login}>
              <Button type='text' icon={ <LoginOutlined />}>
                Вход
              </Button>            
            </Link>
        </Space>
    </Layout.Header>
  )
}

export default Header