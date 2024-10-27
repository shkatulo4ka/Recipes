import {Form, Input} from 'antd';
import { NamePath } from 'antd/es/form/interface';

type Props = {
    name: string;
    placeholder: string;
    dependencies?: NamePath[]
}

const PassInput = ({
    name, placeholder, dependencies
}: Props) => {
  return (
    <Form.Item
        name={name}
        dependencies={dependencies}
        hasFeedback
        rules={[{}]}
    >
        <Input.Password placeholder={placeholder} size='large'/>
    </Form.Item>
  )
}

export default PassInput