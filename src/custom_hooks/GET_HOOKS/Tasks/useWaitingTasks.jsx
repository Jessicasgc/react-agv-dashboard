import React from 'react';
import { getWaitingTasks } from '../../../utils/crud_api';

function useWaitingTasks() {
  const [tasks, setTasks] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    getWaitingTasks().then(({data}) => {
      setTasks(data);
      setLoading(false);
    })
  }, []);

  return { tasks, loading, setTasks};
}

export default useWaitingTasks;
