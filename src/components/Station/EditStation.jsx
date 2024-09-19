import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Select, Button } from 'antd';
import useStations from '../../custom_hooks/GET_HOOKS/useStations';
import useItemTypes from '../../custom_hooks/GET_HOOKS/useItemTypes';

const { Option } = Select;

function EditStation({ id, onStationEdited }) {
    const { itemtypes } = useItemTypes();
    const { stations, loading } = useStations();

    const [form] = Form.useForm();
    const [initialValues, setInitialValues] = useState({
        id_type: "",
        x: "",
        y: "",
        stock: "",
        max_capacity: ""
    });

    useEffect(() => {
        if (stations.length > 0 && !loading) {
            const station = stations.find(station => station.id === id);
            if (station) {
                setInitialValues({
                    id_type: station.id_type || "",
                    x: station.x || "",
                    y: station.y || "",
                    stock: station.stock || "",
                    max_capacity: station.max_capacity || ""
                });
                form.setFieldsValue(station);
            }
        }
    }, [id, stations, loading, form]);

    const onFinish = async (values) => {
        await onStationEdited(id, values);
    };

    return (
        <Form
            form={form}
            className="add-input"
            layout="vertical"
            initialValues={initialValues}
            onFinish={onFinish}
        >
            <Form.Item
                name="id_type"
                label="Item Type"
                rules={[{ required: true, message: 'Please select the type of item!' }]}
            >
                <Select placeholder="Select Type of Item">
                    {itemtypes.map((itemtype) => (
                        <Option key={itemtype.id} value={itemtype.id}>
                            {itemtype.type_name}
                        </Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item
                name="x"
                label="X coordinate"
                rules={[{ required: true, message: 'Please input X coordinate!' }]}
            >
                <Input placeholder="X coordinate" />
            </Form.Item>

            <Form.Item
                name="y"
                label="Y coordinate"
                rules={[{ required: true, message: 'Please input Y coordinate!' }]}
            >
                <Input placeholder="Y coordinate" />
            </Form.Item>
            <Form.Item
                name="stock"
                label="Stock"
                rules={[{ required: true, message: 'Please input stock!' }]}
            >
                <Input placeholder="Stock" />
            </Form.Item>

            <Form.Item
                name="max_capacity"
                label="Max Capacity"
                rules={[{ required: true, message: 'Please input max capacity!' }]}
            >
                <Input placeholder="Max Capacity" />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Edit Station
                </Button>
            </Form.Item>
        </Form>
    );
}

EditStation.propTypes = {
    id: PropTypes.number.isRequired,
    onStationEdited: PropTypes.func.isRequired,
};

export default EditStation;
