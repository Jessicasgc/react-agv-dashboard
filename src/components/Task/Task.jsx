import TaskBody from './TaskBody';
import { showFormattedDate } from '../../utils/formattedDate';
import PropTypes from 'prop-types';
import DeleteButton from '../DeleteButton';

function Task({id, task_name, task_code, task_status, id_agv, start_time, end_time, created_at, updated_at, onDelete}){
    return (
        <div className='task-body'>
            <TaskBody 
                id={id} 
                task_name={task_name} 
                task_code={task_code} 
                task_status={task_status} 
                id_agv={id_agv} 
                start_time={start_time} 
                end_time={end_time}
                created_at={showFormattedDate(created_at)}
                updated_at={showFormattedDate(updated_at)}
            />
            <DeleteButton id = {id} onDelete={onDelete} />
        </div>
    );
}
Task.propTypes= {
    id: PropTypes.number.isRequired,
    task_name: PropTypes.string.isRequired,
    task_code: PropTypes.string.isRequired,
    task_status: PropTypes.string.isRequired,
    id_agv: PropTypes.number,
    start_time: PropTypes.string,
    end_time: PropTypes.string,
    created_at: PropTypes.string.isRequired,
    updated_at: PropTypes.string.isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default Task; 