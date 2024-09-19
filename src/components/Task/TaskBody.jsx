import propTypes from 'prop-types';
import { Typography, Tag } from 'antd'; 

function TaskBody({id, task_name, task_code, task_status, id_agv, start_time, end_time, created_at, updated_at}){
 
   return(
      <div>
        <Typography.Title level={3} className='task_name'>{task_name}</Typography.Title>
            <Typography.Text className='task_code'>{task_code}</Typography.Text>
            <Typography.Paragraph className='agv_code'>{id_agv}</Typography.Paragraph>
            <Tag className='task_status' color={task_status === 'waiting' ? 'orange' : task_status === 'processing' ? 'yellow': task_status === 'allocated'? 'blue' : 'green'}>{task_status}</Tag>
            <Typography.Paragraph className='task_time'>{start_time} --- {end_time}</Typography.Paragraph>
            <Typography.Paragraph className='created_at'>{created_at}</Typography.Paragraph>
            <Typography.Paragraph className='updated_at'>{updated_at}</Typography.Paragraph>
      </div>
    );
}

TaskBody.propTypes = {
   id: propTypes.number.isRequired,
   task_name: propTypes.string.isRequired,
   task_code: propTypes.string.isRequired,
   task_status: propTypes.string.isRequired,
   id_agv: propTypes.number,
   start_time: propTypes.string,
   end_time: propTypes.string,
   created_at: propTypes.string.isRequired,
   updated_at: propTypes.string.isRequired,
};

export default TaskBody;