import React from 'react';
import { getAllocatedTasksByIdAGV } from '../../utils/crud_api';

function useAllocatedTasks(id_agv) {
 const [tasks, setTasks] = React.useState([]);
 const [loading, setLoading] = React.useState(true);

 React.useEffect(() => {
    if (id_agv) {
        getAllocatedTasksByIdAGV(id_agv).then(({data}) => {
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

 return { tasks, loading };
}
export default useAllocatedTasks;