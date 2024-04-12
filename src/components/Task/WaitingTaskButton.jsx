import React from 'react';
import { FaDatabase } from 'react-icons/fa';
import { Badge, Popover } from 'antd';
import WaitingTaskList from './WaitingTaskList';

function WaitingTaskButton() {
    const [visible, setVisible] = React.useState(false);
    const [waitingTaskCount, setWaitingTaskCount] = React.useState(0);

    const handleClick = () => {
        setVisible(!visible);
    };

    const handleVisibleChange = (visible) => {
        setVisible(visible);
    };
    
    return (
        <Popover
            content={<WaitingTaskList onCountChange={setWaitingTaskCount}/>}
            trigger="click"
            open={visible}
            onOpenChange={handleVisibleChange}
            placement="bottom"
            overlayClassName="add-task-popover"
        >
            <Badge count={waitingTaskCount}>
                <button className='icon' onClick={handleClick}>
                    <FaDatabase />
                </button>
            </Badge>
            
        </Popover>
    );
}

export default WaitingTaskButton;
