import Task from './Task';
import PropTypes from 'prop-types';
import useAllocatedTasks from '../../custom_hooks/GET_HOOKS/Tasks/useAllocatedTasks';
import useProcessingTask from '../../custom_hooks/GET_HOOKS/Tasks/useProcessingTask';

export function ProcessingTaskListByAGV({task, onDelete}){
    return (
        <div className='tasks-list'>
            {
                task.map((ts) => (
                    <Task
                    key={ts.id} 
                    id={ts.id}
                    {...ts}   
                    onDelete={onDelete}
                    />
                ))  
            }
        </div>  
    );
}
    
ProcessingTaskListByAGV.propTypes= {
    task: PropTypes.array.isRequired,
    onDelete: PropTypes.func.isRequired,
}; 

export function AllocatedTaskListByAGV({tasks, onDelete}){
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
    
AllocatedTaskListByAGV.propTypes= {
    tasks: PropTypes.array.isRequired,
    onDelete: PropTypes.func.isRequired,
};

