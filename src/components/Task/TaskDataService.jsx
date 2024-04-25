
import PropTypes from 'prop-types';
import { Card } from 'antd';

function TaskDataService({id, ...props}){
    console.log(props);
    return(
        <Card title={`Task ${id}`} bordered={false} style={{ width: 220, marginBottom:15, textAlign: 'left' }}>
            {/* <p>Power : {props.x}%</p> */}
            <p>Position : {`(${props.goal.x}, ${props.goal.y})`}</p>
            {/* <p>Status : {props.isOnline ? 'Online' : 'Offline'}</p> */}
        </Card>
    );
  
}
TaskDataService.propTypes= {
    id: PropTypes.number.isRequired,
    agv_code: PropTypes.string.isRequired,
    agv_name: PropTypes.string.isRequired,
    agv_status: PropTypes.string.isRequired,
    is_charging: PropTypes.bool.isRequired,
};

export default TaskDataService; 