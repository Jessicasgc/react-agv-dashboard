import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, Select, Input, Button, message } from 'antd';
import useItemTypes from '../../custom_hooks/GET_HOOKS/useItemTypes';

const { Option } = Select;

const AddItem = ({onItemAdded}) => {
    const { itemtypes, loading:loadingItemTypes } = useItemTypes();
    const [form] = Form.useForm();
    const onFinish = async (values) => {
        await onItemAdded(values);
        form.resetFields();
    }
    return (
        <Form
            form={form}
            className='add-input'
            layout="vertical"
            onFinish={onFinish}
        >
            <Form.Item
                name='id_type'
                label='Item Type'
                rules={[{ required: true, message: 'Please select the item type!' }]}
            >
                <Select placeholder='Select Type of Item' loading={loadingItemTypes}>
                    {itemtypes.map(itemtype => (
                        <Option key={itemtype.id} value={itemtype.id}>
                            {itemtype.type_name}
                        </Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item
                name='item_name'
                label='Item Name'
                rules={[{ required: true, message: 'Please input the item name!' }]}
            >
                <Input placeholder='Item Name' />
            </Form.Item>

            <Form.Item className='add-task_action'>
                <Button className='action' type='primary' htmlType='submit'>
                    Add Item
                </Button>
            </Form.Item>
            
        </Form>
    );
};
AddItem.propTypes = {
    onItemAdded: PropTypes.func.isRequired,
};


export default AddItem;
