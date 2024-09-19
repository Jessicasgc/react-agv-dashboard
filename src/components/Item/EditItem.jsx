import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Select, Input, Button, Form } from 'antd';
import useItems from '../../custom_hooks/GET_HOOKS/useItems';
import useItemTypes from '../../custom_hooks/GET_HOOKS/useItemTypes';

const { Option } = Select;
const { Item: FormItem } = Form;

function EditItem({ id, editItemById }) {
    const { itemtypes } = useItemTypes();
    const { items, loading: itemsLoading } = useItems();
    
    const [form] = Form.useForm();
    
    const [formData, setFormData] = useState({
        id_type: "",
        item_name: "",
    });

    useEffect(() => {
        if (items.length > 0 && !itemsLoading) {
            const item = items.find(item => item.id === id);
            if (item) {
                setFormData({
                    id_type: item.id_type || "",
                    item_name: item.item_name || "",
                });
                form.setFieldsValue({
                    id_type: item.id_type || "",
                    item_name: item.item_name || "",
                });
            }
        }
    }, [id, items, itemsLoading, form]);

    const onSubmitHandler = async (values) => {
        await editItemById(id, values);
    };

    return (
        <Form
            form={form}
            onFinish={onSubmitHandler}
            layout="vertical"
            className='add-input'
        >
            <Form.Item
                name="id_type"
                label="Item Type"
                rules={[{ required: true, message: 'Please select an item type' }]}
            >
                <Select
                    // className='task_dropdown'
                    placeholder="Select Item Type"
                >
                    {itemtypes.map((itemtype) => (
                        <Option key={itemtype.id} value={itemtype.id}>
                            {itemtype.type_name}
                        </Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item
                name="item_name"
                label="Item Name"
                rules={[{ required: true, message: 'Please enter item name' }]}
            >
                <Input type="text" />
            </Form.Item>
            
            <Form.Item>
                <div className='task_action'>
                    <Button type='primary' htmlType='submit'>
                        Edit Item
                    </Button>
                </div>
            </Form.Item>
        </Form>
    );
}

EditItem.propTypes = {
    editItemById: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
};

export default EditItem;
