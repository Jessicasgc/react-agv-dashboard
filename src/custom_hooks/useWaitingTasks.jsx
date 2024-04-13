import React from 'react';
import { getWaitingTasks } from '../utils/crud_api';

function useWaitingTasks() {
 const [tasks, setTasks] = React.useState([]);
 const [loading, setLoading] = React.useState(true);

 React.useEffect(() => {
    getWaitingTasks().then(({task}) => {
      setTasks(task);
      setLoading(false);
    })
    // return () => {
    //   setLoading(true);
    // };
 }, []);

 return [tasks, loading];
}
export default useWaitingTasks;