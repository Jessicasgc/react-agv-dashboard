import propTypes from 'prop-types';

function AGVBody({id, agv_code, agv_name, agv_status, is_charging}){
   console.log("ini id di body", id);
   return(
      <div>
         <h3 className='agv_code'>{agv_code}</h3>
         <h5 className='agv_name'>{agv_name}</h5>
         <p className='agv_status'>{agv_status}</p>
         <p className='is_charging'>{is_charging === 1 ? 'charging' : 'not charged'}</p>
      </div>
    );
}

AGVBody.propTypes = {
   id: propTypes.number.isRequired,
   agv_code: propTypes.string.isRequired,
   agv_name: propTypes.string.isRequired,
   agv_status: propTypes.string.isRequired,
   is_charging: propTypes.bool.isRequired,
};

export default AGVBody;