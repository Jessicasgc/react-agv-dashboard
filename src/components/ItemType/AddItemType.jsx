import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button } from 'antd';

const AddItemType = ({onItemTypeAdded}) => {
    const [form] = Form.useForm();

    const onSubmitHandler = async (values) => {
        await onItemTypeAdded(values);
        form.resetFields();
    };

    return (
        <Form
            form={form}
            className='add-input'
            layout="vertical"
            onFinish={onSubmitHandler}
        >
            <Form.Item
                name='type_name'
                label='Type Name'
                rules={[{ required: true, message: 'Please input the type name!' }]}
            >
                <Input placeholder='Type Name' />
            </Form.Item>
            <Form.Item className='add-task_action'>
                <Button className='action' type='primary'  htmlType='submit' >
                    Add Item Type
                </Button>
            </Form.Item>
        </Form>
    );
}
AddItemType.propTypes = {
    onItemTypeAdded: PropTypes.func.isRequired,
}

export default AddItemType;
