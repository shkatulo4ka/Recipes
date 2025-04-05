import { LoginOutlined, ReadOutlined, UserOutlined } from "@ant-design/icons";
import { Layout, Space, Typography } from "antd";
import styles from "./Header.module.css";
import Button from "../button/Button";
import { Link, useNavigate } from "react-router-dom";
import { Paths } from "../../paths";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../../features/auth/authSlice";

const Header = () => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLogoutClick = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <Layout.Header className={styles.header}>
      <Space>
        <ReadOutlined className={styles.teamIcon} />
        <Link to={Paths.home}>
          <Button type="text">
            <Typography.Title level={1}>Рецепты</Typography.Title>
          </Button>
        </Link>
      </Space>
      {user ? (
        <Button type="text" icon={<LoginOutlined />} onClick={onLogoutClick}>
          Выйти
        </Button>
      ) : (
        <Space>
          <Link to={Paths.register}>
            <Button type="text" icon={<UserOutlined />}>
              Регистрация
            </Button>
          </Link>
          <Link to={Paths.login}>
            <Button type="text" icon={<LoginOutlined />}>
              Вход
            </Button>
          </Link>
        </Space>
      )}
    </Layout.Header>
  );
};

export default Header;
