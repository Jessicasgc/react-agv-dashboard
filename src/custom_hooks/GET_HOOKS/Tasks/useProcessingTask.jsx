import React from 'react';
import { getProcessingTaskByIdAGV } from '../../../utils/crud_api';

function useProcessingTask(id_agv) {
    const [task, setTasks] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const fetchProcessingTask = async () => {
        setLoading(true);
        const { data } = await getProcessingTaskByIdAGV(id_agv);
        setTasks(data);
        setLoading(false);
    };
    React.useEffect(() => {
    if (id_agv) {
        fetchProcessingTask();
    } else {
        setLoading(false); // No need to fetch if id_agv is empty
    }
    }, [id_agv]);

 return { task, loading, fetchProcessingTask, setTasks };
}
export default useProcessingTask;
