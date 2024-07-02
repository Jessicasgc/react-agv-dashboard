import React from 'react';
import { getAllocatedTasksByIdAGV } from '../../../utils/crud_api';

function useAllocatedTasks(id_agv) {
  const [tasks, setTasks] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const fetchAllocatedTasks = async () => {
    setLoading(true);
    const { data } = await getAllocatedTasksByIdAGV(id_agv);
    setTasks(data);
    setLoading(false);
  }
  React.useEffect(() => {
    if (id_agv) {
      fetchAllocatedTasks();
    } else {
      setLoading(false);
    }
  }, [id_agv]);

  return { tasks, loading, fetchAllocatedTasks, setTasks };
}

export default useAllocatedTasks;

// function useAllocatedTasks(id_agv) {
//   const [tasks, setTasks] = React.useState([]);
//   const [loading, setLoading] = React.useState(true);
//   const fetchAllocatedTasks = async () => {
//     setLoading(true);
//     const { data } = await getAllocatedTasksByIdAGV(id_agv);
//     setTasks(data);
//     setLoading(false);
//   }
//   React.useEffect(() => {
//     if (id_agv) {
//       fetchAllocatedTasks();
//     } else {
//       setLoading(false);
//     }
//   }, [id_agv]);

//   return { tasks, loading, fetchAllocatedTasks};
// }

// function useAllocatedTasks() {
//     const [tasks, setTasks] = React.useState([]);
//     const [loading, setLoading] = React.useState(true);
  
//     const fetchAllocatedTasks = async () => {
//       setLoading(true);
//       const { data } = await getAllocatedTasks();
//       setTasks(data);
//       setLoading(false);
//     };
  
//     React.useEffect(() => {
//         fetchAllocatedTasks();
//     }, []);
  
//     return { tasks, loading, fetchAllocatedTasks };
//   }
  
//   export default useAllocatedTasks;