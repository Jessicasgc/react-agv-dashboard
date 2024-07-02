//import useWaitingTasks from '../../custom_hooks/useWaitingTasks';
import Task from './Task';
import PropTypes from 'prop-types';

function WaitingTaskList({tasks, onDelete}){
    // const [tasks, loading] = useWaitingTasks();

    //if (loading) return <p>Loading...</p>;
    // const filteredWaitingTask = tasks.filter(task => task.task_status === 'waiting');

    // const waitingTaskCount = filteredWaitingTask.length;

    // Pass the waitingTaskCount to the parent component
    // onCountChange(waitingTaskCount);
    console.log(tasks);
    return (
        <div className='tasks-list'>
            {
                tasks.map((task) => (
                    <Task
                    key={task.id} 
                    id={task.id}
                    {...task} 
                    onDelete={onDelete}  
                    />
                ))  
            }
        </div>  
    );
}

WaitingTaskList.propTypes = {
    tasks: PropTypes.array.isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default WaitingTaskList;