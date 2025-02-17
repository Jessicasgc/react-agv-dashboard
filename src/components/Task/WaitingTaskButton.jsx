import React from 'react';
import { FaDatabase } from 'react-icons/fa';
import { Badge, Popover } from 'antd';
import WaitingTaskList from './WaitingTaskList';
import useWaitingTasks from '../../custom_hooks/GET_HOOKS/useWaitingTasks';

function WaitingTaskButton() {
    const {tasks, loading} = useWaitingTasks();
    const [open, setOpen] = React.useState(false);

    const hide = () => {
        setOpen(false);
    };

    // Handle popover visibility change
    const handleOpenChange = (newOpen) => {
        setOpen(newOpen);
    };
    

   console.log(tasks);
    return (
        <React.Fragment>
                <Popover
                    content={ loading ? ( // If loading is true, show loading indicator
                    <p>Loading...</p>
                        ) : ( // Otherwise, show the WaitingTaskList if tasks are available
                            tasks && tasks.length > 0 ? (
                                <a onClick={hide}>
                                    <WaitingTaskList tasks={tasks} />
                                </a>
                            ) : (
                                <p>No tasks to display</p>
                            )
                        )
                    }
                    title="Waiting Task List"
                    trigger="click"
                    open={open}
                    onOpenChange={handleOpenChange}
                    placement="bottom"
                    overlayClassName="add-task-popover"
                >
                    <Badge count={tasks.length}>
                    <button className='icon-waiting-task'>
                        <FaDatabase />
                    </button>
                    </Badge>
                </Popover>
        </React.Fragment>
    );
}

export default WaitingTaskButton;
