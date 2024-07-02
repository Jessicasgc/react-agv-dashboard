import React from 'react';
import { addStation } from '../../utils/crud_api';
function useAddStation(fetchStations) {
 const [error, setError] = React.useState(null);
 const [loading, setLoading] = React.useState(true);

 async function addingStation({  id_type, x, y, max_capacity }) {
    try {
      setLoading(true);
      const response = await addStation({  id_type, x, y, max_capacity });
      fetchStations();
      console.log(response);
      // onStationAdded();
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  return { addingStation, loading, error };
}
export default useAddStation;