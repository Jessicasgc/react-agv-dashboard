import PropTypes from 'prop-types';
import { Form, Input, Select, Button } from 'antd';
import useItemTypes from '../../custom_hooks/GET_HOOKS/useItemTypes';

const { Option } = Select;

function AddStation ({onStationAdded}){
    const { itemtypes } = useItemTypes();

    const onFinish = async (values) => {
        console.log('Form values:', values);
        await onStationAdded(values);
        form.resetFields();
        console.log('Form submitted and onStationAdded called');
    };
    const [form] = Form.useForm();

    return (
        <Form
            form={form}
            className='add-input'
            layout="vertical"
            onFinish={onFinish}
        >
            <Form.Item
                name="id_type"
                label="Item Type"
                rules={[{ required: true, message: 'Please select the type of item!' }]}
            >
                <Select placeholder="Select Type of Item" onChange={(value) => form.setFieldsValue({ id_type: value })}>
                    {itemtypes.map(itemtype => (
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
                name="max_capacity"
                label="Max Capacity"
                rules={[{ required: true, message: 'Please input max capacity!' }]}
            >
                <Input placeholder="Max Capacity" />
            </Form.Item>

            <Form.Item>
                <Button className='action' type='primary' htmlType='submit'>
                    Add Station
                </Button>
            </Form.Item>
        </Form>
    );
}
AddStation.propTypes = {
    onStationAdded: PropTypes.func.isRequired,
};


export default AddStation;
