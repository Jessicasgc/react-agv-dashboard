import propTypes from 'prop-types';


function TaskBody({id, task_name, task_code, task_status, id_agv, start_time, end_time, created_at, updated_at}){
   console.log("ini id di body", id);
  //  const { agvs, loading } = useAGVs();
  //  const [agvCode, setAgvCode] = React.useState('');
 
  //  React.useEffect(() => {
  //    if (!loading) {
  //      const foundAgv = agvs.find(agv => agv.id === id_agv);
  //      if (foundAgv) {
  //        setAgvCode(foundAgv.agv_code);
  //      }
  //    }
  //  }, [agvs, loading, id_agv]);
 
   return(
      <div>
         <h3 className='task_name'>{task_name}</h3>
         <h5 className='task_code'>{task_code}</h5>
         <p className='agv_code'>{id_agv}</p>
         <p className='task_status'>{task_status}</p>
         <p className='task_time'>{start_time} --- {end_time}</p>
         <p className='created_at'>{created_at}</p>
         <p className='updated_at'>{updated_at}</p>
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