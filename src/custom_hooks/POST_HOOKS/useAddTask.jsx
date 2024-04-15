import React from 'react';
import { addTask } from '../../utils/crud_api';

function useAddTask() {
 const [error, setError] = React.useState(null);
 const [loading, setLoading] = React.useState(true);

 async function addingTask({ id_station_input, id_station_output, id_item }) {
    try {
      setLoading(true);
      const response = await addTask({ id_station_input, id_station_output, id_item });
      // Do something with the response if needed
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