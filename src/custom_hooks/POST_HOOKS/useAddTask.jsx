import React from 'react';
import { addTask } from '../../utils/crud_api';

function useAddTask(fetchTasks) {
 const [error, setError] = React.useState(null);
 const [loading, setLoading] = React.useState(true);

 async function addingTask({ id_destination_station, id_item }) {
    try {
      setLoading(true);
      const response = await addTask({ id_destination_station, id_item });
      fetchTasks();
      console.log(response);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  return { addingTask, loading, error };
}
export default useAddTask;