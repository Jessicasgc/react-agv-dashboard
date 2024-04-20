import React from 'react';
import { getProcessingTaskByIdAGV } from '../../utils/crud_api';

function useProcessingTask(id_agv) {
 const [task, setTasks] = React.useState([]);
 const [loading, setLoading] = React.useState(true);

 React.useEffect(() => {
  if (id_agv) {
      getProcessingTaskByIdAGV(id_agv).then(({data}) => {
          setTasks(data);
          setLoading(false);
      }).catch(error => {
          console.error("Error fetching allocated tasks:", error);
          setLoading(false); // Set loading to false even in case of error
      });
  } else {
      setLoading(false); // No need to fetch if id_agv is empty
  }
}, [id_agv]);

 return { task, loading };
}
export default useProcessingTask;