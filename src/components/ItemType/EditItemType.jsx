import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button } from 'antd';
import useItemTypes from '../../custom_hooks/GET_HOOKS/useItemTypes';

const { Item: FormItem } = Form;

function EditItemType({ id, editItemTypeById }) {
    const { itemtypes, loading: itemTypesLoading } = useItemTypes();
    
    const [form] = Form.useForm();
    
    const [formData, setFormData] = useState({
        type_name: "",
    });

    useEffect(() => {
        if (itemtypes.length > 0 && !itemTypesLoading) {
            const itemtype = itemtypes.find(itemtype => itemtype.id === id);
            if (itemtype) {
                setFormData({
                    type_name: itemtype.type_name || "",
                });
                form.setFieldsValue({
                    type_name: itemtype.type_name || "",
                });
            }
        }
    }, [id, itemtypes, itemTypesLoading, form]);

    const onSubmitHandler = async (values) => {
        await editItemTypeById(id, values);
    };

    return (
        <Form
            form={form}
            className='add-input'
            onFinish={onSubmitHandler}
            layout="vertical"
        >
            <FormItem
                name="type_name"
                label="Item Type Name"
                rules={[{ required: true, message: 'Please enter item type name' }]}
            >
                <Input type="text" />
            </FormItem>
            
            <FormItem>
                <div className='task_action'>
                    <Button type='primary' htmlType='submit'>
                        Edit Item Type
                    </Button>
                </div>
            </FormItem>
        </Form>
    );
}

EditItemType.propTypes = {
    editItemTypeById: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
};

export default EditItemType;
