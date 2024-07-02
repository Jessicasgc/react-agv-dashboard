import Task from './Task';
import PropTypes from 'prop-types';
import useAllocatedTasks from '../../custom_hooks/GET_HOOKS/Tasks/useAllocatedTasks';
import useProcessingTask from '../../custom_hooks/GET_HOOKS/Tasks/useProcessingTask';

export function ProcessingTaskListByAGV({task}){
    

    // if (loading) return <p>Loading...</p>;
   
    return (
        <div className='tasks-list'>
            {
                task.map((ts) => (
                    <Task
                    key={ts.id} 
                    id={ts.id}
                    {...ts}   
                    />
                ))  
            }
        </div>  
    );
}
    
ProcessingTaskListByAGV.propTypes= {
    task: PropTypes.array.isRequired,
}; 

export function AllocatedTaskListByAGV({tasks}){
    // const [tasks, loading] = useAllocatedTasks(1);
    // if (loading) return <p>Loading...</p>;
    // console.log(tasks);
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
    
AllocatedTaskListByAGV.propTypes= {
    tasks: PropTypes.array.isRequired,
};

