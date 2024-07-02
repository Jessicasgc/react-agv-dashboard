import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import useStations from '../../custom_hooks/GET_HOOKS/useStations';
import useItems from '../../custom_hooks/GET_HOOKS/useItems';
import useAddTask from '../../custom_hooks/POST_HOOKS/useAddTask'; // Import the useAddTask hook
import { Button, Form, Input, Select } from 'antd';
import { useWebSocket } from 'react-use-websocket/dist/lib/use-websocket';
import { SERVICE_URL } from '../../utils/constants';
import useTasks from '../../custom_hooks/GET_HOOKS/Tasks/useTasks';

const { Option } = Select;

function AddTask() {
    const { sendJsonMessage } = useWebSocket(SERVICE_URL, { shouldReconnect: (closeEvent) => true });
    const { stations } = useStations();
    const { items } = useItems();
    const { addingTask } = useAddTask();
    const { tasks } = useTasks();

    const [form] = Form.useForm();

    const onFinish = (values) => {
        // const selectedStation = stations.find(station => station.id === values.id_destination_station);
        // if (selectedStation) {
        //     sendJsonMessage({
        //         type: 'task',
        //         data: {
        //             id: values.id_item,
        //             goal: {
        //                 x: selectedStation.x,
        //                 y: selectedStation.y,
        //             },
        //         },
        //     });
        // }
        addingTask(values);
        form.resetFields();
    };
    const filteredStations = (itemTypeId) => {
        return stations.filter(station => {
            return station.id_type === itemTypeId || station.id === 4;
        });
    };
    const filteredItems = () => {
        // Get all item IDs from tasks where task status is 'done'
        const doneItemIds = tasks.filter(task => task.task_status === 'done').map(task => task.id_item);
        // Get all unique item IDs from tasks
        const allTaskItemIds = tasks.map(task => task.id_item);

        // Filter items to get items that meet either condition:
        const filtered = items.filter(item => {
            // Check if item ID is not in any task data or all tasks are 'done'
            return !allTaskItemIds.includes(item.id) || doneItemIds.includes(item.id) ;
        });
        // console.log("Filtered Items:", filtered); // Log the filtered items array
    return filtered;
    };


    return (
        <Form form={form} className='add-input' onFinish={onFinish} layout="vertical">
            <Form.Item label='Item' name='id_item' rules={[{ required: true, message: 'Please select an item!' }]}>
                <Select placeholder='Select Item' style={{ width: 200 }} onChange={(value) => form.setFieldsValue({ id_item: value })}>
                    {filteredItems().map(item => (
                        <Option key={item.id} value={item.id}>{item.item_code}</Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item label='Destination Station' name='id_destination_station' rules={[{ required: true, message: 'Please select a destination station!' }]}>
                <Select placeholder='Select Destination Station' style={{ width: 200 }} onChange={(value) => form.setFieldsValue({ id_destination_station: value })}>
                    {form.getFieldValue('id_item') && filteredStations(items.find(item => item.id === form.getFieldValue('id_item')).id_type).map(station => (
                        <Option key={station.id} value={station.id}>{station.station_name}</Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item>
                <Button className='action' type='primary' htmlType='submit'>
                    Add Task
                </Button>
            </Form.Item>
        </Form>
    );
}

export default AddTask;
