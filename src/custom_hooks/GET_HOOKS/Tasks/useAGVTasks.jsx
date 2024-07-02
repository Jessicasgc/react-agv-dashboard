import React from 'react';
import { getTasksByIdAGV } from '../../../utils/crud_api';
import { toast } from 'react-toastify';

function useAGVTasks(id_agv) {
  const [loading, setLoading] = React.useState(true);
  const [tasks, setTasks] = React.useState([]);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      setError(null);

      try {
        const { data } = await getTasksByIdAGV(id_agv);
        setTasks(data);
      } catch (error) {
        setError('Failed to fetch tasks for AGV');
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (id_agv) {
      fetchTasks();
    } else {
      setLoading(false);
    }
  }, [id_agv]);

  return { tasks, loading, error };
}

export default useAGVTasks;
