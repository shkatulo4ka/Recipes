import {Button as AntButton, Form} from 'antd';

type Props = {
    children: React.ReactNode;
    htmlType?: "button" | "submit" | "reset";
    onClick?: () => void;
    type?: "link" | "text" | "default" | "primary" | "dashed";
    danger?: boolean;
    loading?: boolean;
    shape?: "default" | "circle" | "round";
    icon?: React.ReactNode
}

const Button = ({
    children,
    htmlType = 'button',
    type,
    onClick,
    danger = false,
    loading,
    shape,
    icon
}: Props) => {
  return (
    <Form.Item>
      <AntButton 
        htmlType={htmlType}
        type={type}
        onClick={onClick}
        danger={danger}
        loading={loading}
        shape={shape}
        icon={icon}
      >  {children} </AntButton>
    </Form.Item>
    
  )
}

export default Button