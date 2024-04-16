import Task from './Task';
import PropTypes from 'prop-types';
import useAGVTasks from '../../custom_hooks/GET_HOOKS/useAGVTasks';

function ProcessingTaskListByAGV({agvId}){
    const [tasks, loading] = useAGVTasks(agvId);

    if (loading) return <p>Loading...</p>;
    const filteredProcessingTask = tasks.filter(task => task.task_status === 'processing');
    return (
        <div className='tasks-list'>
            {
                filteredProcessingTask.map((task) => (
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
    
ProcessingTaskListByAGV.propTypes= {
    agvId: PropTypes.string.isRequired,
}; 

function AllocatedTaskListByAGV({agvId}){
    const [tasks, loading] = useAGVTasks(agvId);

    if (loading) return <p>Loading...</p>;
    const filteredProcessingTask = tasks.filter(task => task.task_status === 'allocated');
    return (
        <div className='tasks-list'>
            {
                filteredProcessingTask.map((task) => (
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
    
AllocatedTaskListByAGV.propTypes= {
    agvId: PropTypes.string.isRequired,
};

export default{
    ProcessingTaskListByAGV,
    AllocatedTaskListByAGV
}