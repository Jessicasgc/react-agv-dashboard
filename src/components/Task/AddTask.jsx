import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Input, Select } from 'antd';
import useTasks from '../../custom_hooks/GET_HOOKS/Tasks/useTasks';
import useStations from '../../custom_hooks/GET_HOOKS/useStations';
import useItems from '../../custom_hooks/GET_HOOKS/useItems';
import useAddTask from '../../custom_hooks/POST_HOOKS/useAddTask';

const { Option } = Select;

function AddTask({ onAddTask }) {
    const { tasks } = useTasks();
    const { stations } = useStations();
    const { items } = useItems();
    const { addingTask } = useAddTask();
    const [form] = Form.useForm();
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedStationName, setSelectedStationName] = useState('');
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
        try {
            const response = await addingTask(values);
            onAddTask(response.data);
        } catch (error) {
            console.error('Error adding task:', error);
        }
        form.resetFields();
        setSelectedItem(null);
        setSelectedStationName('');
    };

    const filteredStations = (itemTypeId) => {
        return stations.filter(station => station.id_type === itemTypeId || station.id === 4);
    };

    const filteredItems = useMemo(() => {
        console.log('tasks:', tasks);
        console.log('items:', items);

        if ( tasks === null ) return items;
        
        const processingAllocatedItemIds = tasks?.filter(task => task.task_status === 'processing' || task.task_status === 'allocated' || task.task_status === 'waiting')
            .map(task => task.id_item);
            if(processingAllocatedItemIds===null){
                return []
            }
        return items?.filter(item => !processingAllocatedItemIds.includes(item.id));

    }, [items, tasks]);

    const handleItemChange = (itemId) => {
        const selectedItem = items.find(item => item.id === itemId);
        setSelectedItem(selectedItem || null);
        const stationId = selectedItem?.id_station || 4;
        const station = stations.find(station => station.id === stationId);
        setSelectedStationName(station ? station.station_name : '');
        form.setFieldsValue({ id_item: itemId });
    };
    console.log('filtered items:', filteredItems);

    return (
        
        <Form form={form} className='add-input' onFinish={onFinish} layout="vertical">
            <Form.Item label='Item' name='id_item' rules={[{ required: true, message: 'Please select an item!' }]}>
                <Select placeholder='Select Item' style={{ width: 200 }} onChange={handleItemChange}>
                    {items.map(item => (
                        <Option key={item.id} value={item.id}>{item.item_code}</Option>
                    ))}
                </Select>
            </Form.Item>

            {selectedItem && (
                <Form.Item label='Item Location'>
                    <Input value={selectedStationName} readOnly />
                </Form.Item>
            )}

            <Form.Item label='Destination Station' name='id_destination_station' rules={[{ required: true, message: 'Please select a destination station!' }]}>
                <Select placeholder='Select Destination Station' style={{ width: 200 }}>
                    {selectedItem && filteredStations(selectedItem.id_type).map(station => (
                        <Option key={station.id} value={station.id}>{station.station_name}</Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item>
                <Button className='action' type='primary' htmlType='submit' loading={loading}>
                    Add Task
                </Button>
            </Form.Item>
        </Form>
    );
}

AddTask.propTypes = {
    onAddTask: PropTypes.func.isRequired,
};

export default AddTask;
