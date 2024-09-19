import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaPlusCircle } from 'react-icons/fa';
import { Popover, Button } from 'antd';
import AddTask from './AddTask';

function AddTaskButton({ onAddTask }) {
    const [open, setOpen] = useState(false);

    const handleOpenChange = (newOpen) => {
        setOpen(newOpen);
    };

    const onAddTaskHandler = (values) => {
        try {
            onAddTask(values); // Assuming values contain id_destination_station, id_start_station, id_item
            hide();
        } catch (error) {
            console.error('Error adding task:', error);
            // Handle error (e.g., show error message to user)
        }
    };

    const hide = () => {
        setOpen(false);
    };

    return (
        <Popover
            content={<AddTask onAddTask={onAddTaskHandler} />}
            title="Add Task"
            trigger="click"
            visible={open}
            onVisibleChange={handleOpenChange}
            placement="bottom"
            overlayClassName="add-task-popover"
        >
            <Button className='icon-add-task' icon={<FaPlusCircle />} />
        </Popover>
    );
}

AddTaskButton.propTypes = {
    onAddTask: PropTypes.func.isRequired,
};

export default AddTaskButton;
