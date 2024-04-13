import React from 'react';
import { FaPlusCircle } from 'react-icons/fa';
import { Popover } from 'antd';
import AddTask from './AddTask';
import { addTask } from '../../utils/crud_api';

function AddTaskButton() {
    const [open, setOpen] = React.useState(false);

    const hide = () => {
        setOpen(false);
    };

    // Handle popover visibility change
    const handleOpenChange = (newOpen) => {
        setOpen(newOpen);
    };
    
      
    function onAddTaskHandler({ id_station_input, id_station_output, id_item}){
        addTask({ id_station_input, id_station_output, id_item});
        hide();
    }
    
    return (
        <Popover
            content={<a><AddTask addTask={onAddTaskHandler} /></a>}
            title="Add Task"
            trigger="click"
            open={open}
            onOpenChange={handleOpenChange}
            placement="bottom"
            overlayClassName="add-task-popover"
        >
            <button className='icon-add-task'> 
                <FaPlusCircle />
            </button>
        </Popover>
    );
}

export default AddTaskButton;
