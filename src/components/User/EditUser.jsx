import React from 'react';
import PropTypes from 'prop-types';
import useUsers from '../../custom_hooks/GET_HOOKS/useUsers';
import { Form, Input, Select, Button } from 'antd';

const { Option } = Select;

function EditUser({ id, editUserById }) {
    const { users, loading } = useUsers();
    const [form] = Form.useForm();
    const [initialValues, setInitialValues] = React.useState({
        name: "",
        role: "",
        email: "",
    });

    React.useEffect(() => {
        if (users.length > 0 && !loading) {
            const user = users.find(user => user.id === id);
            if (user) {
                setInitialValues({
                    name: user.name || "",
                    role: user.role || "",
                    email: user.email || "",
                });
                form.setFieldsValue(user);
            }
        }
    }, [id, users, loading, form]);

    const onFinish = async (values) => {
        await editUserById(id, values);
    };

    return (
        <Form
            form={form}
            className='add-input'
            layout='vertical'
            onFinish={onFinish}
            initialValues={initialValues}
        >
            <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: 'Please input the name!' }]}
            >
                <Input
                    placeholder="Name"
                />
            </Form.Item>

            <Form.Item
                label="Role"
                name="role"
                rules={[{ required: true, message: 'Please select the role!' }]}
            >
                <Select
                    placeholder="Select User Role"
                >
                    <Option value="">Select role</Option>
                    <Option value="admin">Admin</Option>
                    <Option value="operator">Operator</Option>
                </Select>
            </Form.Item>

            <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Please input the email!' }, { type: 'email', message: 'Please input a valid email!' }]}
            >
                <Input
                    type='email'
                     placeholder="Email"
                />
            </Form.Item>

            <Form.Item className='task_action'>
                <Button type='primary' htmlType='submit'>
                    Edit User
                </Button>
            </Form.Item>
        </Form>
    );
}

EditUser.propTypes = {
    editUserById: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
};

export default EditUser;
