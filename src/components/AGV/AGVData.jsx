import AGVBody from './AGVBody';
import PropTypes from 'prop-types';

function AGVData({id, agv_code, agv_name, agv_status, is_charging}){
    return (
        <div className='agv-data'>
            <AGVBody id={id} agv_code={agv_code} agv_name={agv_name} agv_status={agv_status} is_charging={is_charging} />
        </div>
    );
}
AGVData.propTypes= {
    id: PropTypes.string.isRequired,
    agv_code: PropTypes.string.isRequired,
    agv_name: PropTypes.string.isRequired,
    agv_status: PropTypes.bool.isRequired,
    is_charging: PropTypes.string.isRequired,
};

export default AGVData; 