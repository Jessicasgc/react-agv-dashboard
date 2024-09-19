import React from 'react';
import PropTypes from 'prop-types';
import { FaDatabase } from 'react-icons/fa';
import { Badge, Popover } from 'antd';
import WaitingTaskList from './WaitingTaskList';
import useWaitingTasks from '../../custom_hooks/GET_HOOKS/Tasks/useWaitingTasks';
import { deleteTaskById } from '../../utils/crud_api';

function WaitingTaskButton({tasks, setTasks}) {
    const {loading} = useWaitingTasks();
    const [open, setOpen] = React.useState(false);
    // const hide = () => {
    //     setOpen(false);
    // };

    // Handle popover visibility change
    const handleOpenChange = (newOpen) => {
        setOpen(newOpen);
    };
    const handleDeleteTask = async(id) => {
        await deleteTaskById(id)
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    };

//    console.log(tasks);
    return (
        <React.Fragment>
                <Popover
                    content={ loading ? ( // If loading is true, show loading indicator
                    <p>Loading...</p>
                        ) : ( // Otherwise, show the WaitingTaskList if tasks are available
                            tasks && tasks.length > 0 ? (
                                <a>
                                    <WaitingTaskList tasks={tasks} onDelete={handleDeleteTask} />
                                </a>
                            ) : (
                                <p style={{color: 'var(--on-background)'}}>No tasks to display</p>
                            )
                        )
                    }
                    title="Waiting Task List"
                    trigger="click"
                    open={open}
                    onOpenChange={handleOpenChange}
                    placement="bottom"
                    overlayClassName="waiting-popover"
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

WaitingTaskButton.propTypes = { tasks: PropTypes.array.isRequired, setTasks: PropTypes.func.isRequired 
}

export default WaitingTaskButton;
