import React from 'react';
import PropTypes from 'prop-types';
import { Select, Button, Form, Space } from 'antd';
import useStations from '../../custom_hooks/GET_HOOKS/useStations';
import useItems from '../../custom_hooks/GET_HOOKS/useItems';
import useTasks from "../../custom_hooks/GET_HOOKS/Tasks/useTasks";

const { Option } = Select;

function EditTask({ id, editTaskById }) {
    const { stations } = useStations();
    const { items } = useItems();
    const { tasks, loading: tasksLoading } = useTasks();
    
    const [form] = Form.useForm();

    React.useEffect(() => {
        if (tasks.length > 0 && !tasksLoading) {
            const task = tasks.find(task => task.id === id);
            if (task) {
                form.setFieldsValue({
                    id_destination_station: task.id_destination_station || "",
                    id_start_station: task.id_start_station || "",
                    id_item: task.id_item || "",
                });
            }
        }
    }, [id, tasks, tasksLoading, form]);

    const onFinish = async (values) => {
        await editTaskById(id, values);
    };
    // const filteredStations = (itemTypeId) => {
    //     return stations.filter(station => {
    //         return station.id_type === itemTypeId || station.id === 4;
    //     });
    // };
    // const filteredItems = () => {
    //     // Get all item IDs from tasks where task status is 'done'
    //     const doneItemIds = tasks.filter(task => task.task_status === 'done').map(task => task.id_item);
    //     // Get all unique item IDs from tasks
    //     const allTaskItemIds = tasks.map(task => task.id_item);

    //     // Filter items to get items that meet either condition:
    //     const filtered = items.filter(item => {
    //         // Check if item ID is not in any task data or all tasks are 'done'
    //         return !allTaskItemIds.includes(item.id) || doneItemIds.includes(item.id);
    //     });
    //     console.log("Filtered Items:", filtered); // Log the filtered items array
    // return filtered;
    // };
    // const handleItemChange = (selectedItemId) => {
    //     const itemType = filteredItems().find(item => item.id === selectedItemId)?.id_type;
    //     form.setFieldsValue({
    //         id_destination_station: "", // Reset destination station when item changes
    //         id_start_station: "", // Reset start station when item changes
    //         id_item: selectedItemId,
    //     });
    //     form.resetFields(['id_destination_station']); // Reset station field
    //     form.resetFields(['id_start_station']); // Reset station field
    //     form.setFieldsValue({
    //         id_item: selectedItemId,
    //         id_destination_station: "",
    //         id_start_station: "",
    //     });
    // };
    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            className="task_form"
        >
            {/* <Form.Item
                label="Start Station"
                name="id_start_station"
                rules={[{ required: true, message: 'Please select a start station!' }]}
            >
                <Select
                    placeholder="Select Start Station"
                  
                >
                    {stations.map(station => (
                        <Option key={station.id} value={station.id}>
                            {station.station_name}
                        </Option>
                    ))}
                </Select>
            </Form.Item> */}
            <Form.Item
                label="Item"
                name="id_item"
                rules={[{ required: true, message: 'Please select an item!' }]}
            >
                <Select
                    placeholder="Select Item"
                    onChange={handleItemChange}
                >
                    {filteredItems.map(item => (
                        <Option key={item.id} value={item.id}>
                            {item.item_code}
                        </Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item
                label="Destination Station"
                name="id_destination_station"
                rules={[{ required: true, message: 'Please select a destination station!' }]}
            >
                <Select
                    placeholder="Select Destination Station"
                    
                >
                   {form.getFieldValue('id_item') && filteredStations(form.getFieldValue('id_item')).map(station => (
                        <Option key={station.id} value={station.id}>{station.station_name}</Option>
                    ))}
                </Select>
            </Form.Item>

           
            <Form.Item>
                <Space>
                    <Button type="primary" htmlType="submit">
                        Edit Task
                    </Button>
                    <Button onClick={() => form.resetFields()}>
                        Reset
                    </Button>
                </Space>
            </Form.Item>
        </Form>
    );
}

EditTask.propTypes = {
    editTaskById: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
};

export default EditTask;
