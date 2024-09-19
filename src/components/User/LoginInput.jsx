import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

function LoginInput({ login }) {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    await login({
      email: values.email,
      password: values.password,
    });
  };

  return (
    <Form
    form={form}
    name="login"
    onFinish={onFinish}
    style={{ width: '100%' }}
    layout="vertical"
  >
    <Form.Item
      name="email"
      rules={[{ required: true, message: 'Please input your email!' }]}
    >
      <Input prefix={<UserOutlined />} placeholder="Email" />
    </Form.Item>
    <Form.Item
      name="password"
      rules={[{ required: true, message: 'Please input your password!' }]}
    >
      <Input.Password prefix={<LockOutlined />} placeholder="Password" />
    </Form.Item>
    <Form.Item>
      <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
        Login
      </Button>
    </Form.Item>
  </Form>
  );
}

LoginInput.propTypes = {
  login: PropTypes.func.isRequired,
};

export default LoginInput;
