import React from 'react';
import { getTasksByIdAGV } from '../utils/crud_api';

function useAGVTasks(id_agv) {
  const [loading, setLoading] = React.useState(true);
  const [tasks, setTasks] = React.useState([]);

  React.useEffect(() => {
    getTasksByIdAGV(id_agv).then((tasks) => {
      setTasks(tasks);
      setLoading(false);
    });

    return () => {
      setLoading(true);
    };
  }, [id_agv]);

  return [tasks, loading];
}
export default useAGVTasks;
