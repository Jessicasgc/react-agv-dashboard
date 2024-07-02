import React from 'react';
import { getTasks } from '../../../utils/crud_api';

function useTasks() {
  const [loading, setLoading] = React.useState(true);
  const [tasks, setTasks] = React.useState([]);

  const fetchTasks = async () => {
    setLoading(true);
    const { data } = await getTasks();
    setTasks(data);
    setLoading(false);
  }

  React.useEffect(() => {
    fetchTasks();
  }, []);

  return { tasks, loading, fetchTasks };
}

export default useTasks;
