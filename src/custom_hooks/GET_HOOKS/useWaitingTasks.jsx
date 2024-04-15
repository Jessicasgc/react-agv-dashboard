import React from 'react';
import { getWaitingTasks } from '../../utils/crud_api';

function useWaitingTasks() {
 const [tasks, setTasks] = React.useState([]);
 const [loading, setLoading] = React.useState(true);

 React.useEffect(() => {
    getWaitingTasks().then(({data}) => {
      console.log(data,'response');
      setTasks(data);
      setLoading(false);
    })
    // return () => {
    //   setLoading(true);
    // };
 }, []);
//console.log(tasks,"hdtdhd");
 return [tasks, loading];
}
export default useWaitingTasks;