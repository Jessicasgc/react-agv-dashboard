import React from 'react';
import { getTasks } from '../utils/crud_api';

function useTasks() {
  const [loading, setLoading] = React.useState(true);
  const [tasks, setTasks] = React.useState([]);

  React.useEffect(() => {
    getTasks().then((tasks) => {
      setTasks(tasks);
      setLoading(false);
    });

    return () => {
      setLoading(true);
    };
  }, []);

  return [tasks, loading];
}
export default useTasks;
