import React from 'react';
import { FaPlusCircle } from 'react-icons/fa';
import { Popover } from 'antd';
import AddTask from './AddTask';
import { addTask } from '../../utils/crud_api';

function AddTaskButton() {
    const [visible, setVisible] = React.useState(false);

    const handleClick = () => {
        setVisible(!visible);
    };

    const handleVisibleChange = (visible) => {
        setVisible(visible);
    };
      
    function onAddTaskHandler({ id_station_input, id_station_output, id_item}){
        addTask({ id_station_input, id_station_output, id_item});
        setVisible(false);
    }
    
    return (
        <Popover
            content={<AddTask addTask={onAddTaskHandler} />}
            trigger="click"
            visible={visible}
            onVisibleChange={handleVisibleChange}
            placement="bottom"
            overlayClassName="add-task-popover"
        >
            <button className='icon' onClick={handleClick}>
                <FaPlusCircle />
            </button>
        </Popover>
    );
}

export default AddTaskButton;
