// import AGVBody from './AGVBody';
import PropTypes from 'prop-types';
import { Card, Flex } from 'antd';
import { FaTruckRampBox } from "react-icons/fa6";

// function AGVData({id, agv_code, agv_name, agv_status, container, power, position, speed, ...props}){
// // function AGVData({id, agv_code, agv_name, agv_status, power, position, container, ...props}){
    
//     return(
//         <Card title={<Flex justify={"space-between"}>AGV {id} { container && <FaTruckRampBox/> } </Flex>} bordered={false} style={{ backgroundColor: 'var(--background)', color: 'var(--on-background)', width: '85%', marginBottom:15, textAlign: 'left' }}
//         headStyle={{ color: 'var(--on-background)' }}>
//             <p>Power : {props.power}%</p>
//             <p>Position : {`(${props.position.x}, ${props.position.y})`}</p>
//             <p>Status : {props.isOnline ? 'Online' : 'Offline'}</p>
            
//         </Card>
//     );
//     // function parsePositionString(positionString) {
//     //     const match = positionString.match(/\(([^)]+)\)/); // Extract content inside parentheses
//     //     if (match) {
//     //         const [x, y] = match[1].split(' '); // Split by space to get x and y
//     //         return { x: parseFloat(x), y: parseFloat(y) }; // Convert strings to numbers
//     //     }
//     //     return { x: 0, y: 0 }; // Default to (0, 0) if parsing fails
//     // }
//     // //const position = parsePositionString(position);
//     // return (
//     //     <AGVBody id={id} agv_code={agv_code} agv_name={agv_name} agv_status={agv_status} power={power} position={parsePositionString(position)} speed={speed} container={container}/>
//     // );
// }
// AGVData.propTypes= {
//     id: PropTypes.number.isRequired,
//     agv_code: PropTypes.string.isRequired,
//     agv_name: PropTypes.string.isRequired,
//     agv_status: PropTypes.string.isRequired,
//     power: PropTypes.number.isRequired,
//     position: PropTypes.string.isRequired,
//     container: PropTypes.bool, 
//     speed: PropTypes.number.isRequired
// };

// export default AGVData; 

function AGVData({id, container, ...props}){
    
    return(
        <Card title={<Flex justify={"space-between"}>AGV {id} { container && <FaTruckRampBox/> } </Flex>} bordered={false} style={{ backgroundColor: 'var(--background)', color: 'var(--on-background)', width: '85%', marginBottom:15, textAlign: 'left' }}
        headStyle={{ color: 'var(--on-background)' }}>
            <p>Power : {props.power}%</p>
            <p>Position : {`(${props.position.x}, ${props.position.y})`}</p>
            <p>Status : {props.isOnline ? 'Online' : 'Offline'}</p>
            <p>Speed : {props.velocity} mm/s</p>
        </Card>
    );
    // return (
    //     <div className='agv-data'>
    //         <AGVBody id={id} agv_code={agv_code} agv_name={agv_name} agv_status={agv_status} is_charging={is_charging} />
    //     </div>
    // );
}
AGVData.propTypes= {
    id: PropTypes.number.isRequired,
    power: PropTypes.number.isRequired,
    position: PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
    }).isRequired,
    // speed: PropTypes.number.isRequired,
    container: PropTypes.bool.isRequired,
    isOnline: PropTypes.bool.isRequired,
    velocity: PropTypes.number.isRequired,
};

export default AGVData; 