import useWaitingTasks from '../../custom_hooks/useWaitingTasks';
import Task from './Task';

function WaitingTaskList(){
    const [tasks, loading] = useWaitingTasks();

    if (loading) return <p>Loading...</p>;
    // const filteredWaitingTask = tasks.filter(task => task.task_status === 'waiting');

    //const waitingTaskCount = filteredWaitingTask.length;

    // Pass the waitingTaskCount to the parent component
    //onCountChange(waitingTaskCount);

    return (
        <div className='tasks-list'>
            {
                tasks.map((task) => (
                    <Task
                    key={task.id} 
                    id={task.id}
                    {...task}   
                    />
                ))  
            }
        </div>  
    );
}

export default WaitingTaskList;