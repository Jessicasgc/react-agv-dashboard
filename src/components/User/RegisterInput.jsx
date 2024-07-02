import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Select, Button } from 'antd';
import { register } from '../../utils/crud_api';

const { Option } = Select;

function RegisterInput({ onRegister }) {
    const [form] = Form.useForm();

    const onSubmitHandler = async (values) => {
        const response = await register(values);
        onRegister(response.data.user);
        console.log(response.data.user)
        form.resetFields();
    };

    return (
        <Form
            form={form}
            onFinish={onSubmitHandler}
            layout="vertical"
            className='input-register'
        >
            <Form.Item
                name="name"
                label="Name"
                rules={[{ required: true, message: 'Please enter your name!' }]}
            >
                <Input placeholder="Enter your name" />
            </Form.Item>

            <Form.Item
                name="role"
                label="Role"
                rules={[{ required: true, message: 'Please select a role!' }]}
                initialValue="operator"
            >
                <Select>
                    <Option value="operator">Operator</Option>
                    <Option value="admin">Admin</Option>
                </Select>
            </Form.Item>

            <Form.Item
                name="email"
                label="Email"
                rules={[
                    { required: true, message: 'Please enter your email!' },
                    { type: 'email', message: 'Please enter a valid email!' }
                ]}
            >
                <Input placeholder="Enter your email" />
            </Form.Item>

            <Form.Item
                name="password"
                label="Password"
                rules={[{ required: true, message: 'Please enter your password!' }]}
            >
                <Input.Password placeholder="Enter your password" autoComplete="current-password" />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Register
                </Button>
            </Form.Item>
        </Form>
    );
}

RegisterInput.propTypes = {
    onRegister: PropTypes.func.isRequired,
};

export default RegisterInput;
