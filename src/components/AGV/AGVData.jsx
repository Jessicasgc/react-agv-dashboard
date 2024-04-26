import AGVBody from './AGVBody';
import PropTypes from 'prop-types';
import { Card, Flex, Space } from 'antd';
import { FaTruckRampBox } from "react-icons/fa6";

function AGVData({id, agv_code, agv_name, agv_status, is_charging,container, ...props}){
    
    return(
        <Card title={<Flex justify={"space-between"}>AGV {id} { container && <FaTruckRampBox/> } </Flex>} bordered={false} style={{ backgroundColor: 'var(--background)', color: 'var(--on-background)', width: '85%', marginBottom:15, textAlign: 'left' }}
        headStyle={{ color: 'var(--on-background)' }}>
            <p>Power : {props.power}%</p>
            <p>Position : {`(${props.position.x}, ${props.position.y})`}</p>
            <p>Status : {props.isOnline ? 'Online' : 'Offline'}</p>
        </Card>
    );
    return (
        <div className='agv-data'>
            <AGVBody id={id} agv_code={agv_code} agv_name={agv_name} agv_status={agv_status} is_charging={is_charging} />
        </div>
    );
}
AGVData.propTypes= {
    id: PropTypes.number.isRequired,
    agv_code: PropTypes.string.isRequired,
    agv_name: PropTypes.string.isRequired,
    agv_status: PropTypes.string.isRequired,
    is_charging: PropTypes.bool.isRequired,
};

export default AGVData; 