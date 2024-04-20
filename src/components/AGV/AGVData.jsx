import AGVBody from './AGVBody';
import PropTypes from 'prop-types';

function AGVData({id, agv_code, agv_name, agv_status, is_charging}){
    console.log("ini id di body", id);
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