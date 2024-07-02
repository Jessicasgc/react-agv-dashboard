import propTypes from 'prop-types';
import { Card, Flex} from 'antd';
import { FaTruckRampBox } from "react-icons/fa6";

function AGVBody({id, agv_code, agv_name, agv_status, power, position, speed, container}){
   // console.log("ini id di body", id);
   // console.log("ini agv_code di body", agv_code);
   // console.log("ini agv_name di body", agv_name);
   // console.log("ini agv_status di body", agv_status);
   // console.log("ini power di body", power);
   // console.log("ini position di body", position);
   // console.log("ini speed di body", speed);
   return(
      <Card title={<Flex justify={"space-between"}>{agv_name} { container && <FaTruckRampBox/> } </Flex>} bordered={false} style={{ backgroundColor: 'var(--background)', color: 'var(--on-background)', width: '85%', marginBottom:15, textAlign: 'left' }}
        headStyle={{ color: 'var(--on-background)' }}> 
         <h3 className='agv_code'>AGV Code: {agv_code}</h3>
         {/* <h5 className='agv_name'>{agv_name}</h5> */}
         <p className='agv_status'>Status: {agv_status}</p>
         <p className='power'>Power: {power}%</p>
         <p className='position'>Position:({position.x}, {position.y})</p>
         <p className='speed'>Speed: {speed} mm/s</p>
      </Card>
    );
}

AGVBody.propTypes = {
   id: propTypes.number.isRequired,
   agv_code: propTypes.string.isRequired,
   agv_name: propTypes.string.isRequired,
   agv_status: propTypes.string.isRequired,
   power: propTypes.number.isRequired,
   position: propTypes.shape({
      x: propTypes.number.isRequired,
      y: propTypes.number.isRequired,
  }).isRequired,
  speed: propTypes.number.isRequired,
  container: propTypes.bool.isRequired, 
};

export default AGVBody;