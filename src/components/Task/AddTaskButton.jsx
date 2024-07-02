import React from 'react';
import PropTypes from 'prop-types';
import { FaPlusCircle } from 'react-icons/fa';
import { Popover } from 'antd';
import AddTask from './AddTask';
import useAddTask from '../../custom_hooks/POST_HOOKS/useAddTask';

function AddTaskButton() {
    const [open, setOpen] = React.useState(false);
    const { addingTask } = useAddTask();
    const hide = () => {
        setOpen(false);
    };

    // Handle popover visibility change
    const handleOpenChange = (newOpen) => {
        setOpen(newOpen);
    };
    
      
    async function onAddTaskHandler({ id_destination_station, id_start_station, id_item}){
        // const response = 
        await addingTask({ id_destination_station, id_start_station, id_item});
        // onAddTask(response.data.data);
        hide();
    }
    
    return (
        <Popover
            content={<a><AddTask onAddTask={onAddTaskHandler} /></a>}
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
// AddTaskButton.propTypes = { 
//     onAddTask: PropTypes.func.isRequired, 
// };
export default AddTaskButton;
