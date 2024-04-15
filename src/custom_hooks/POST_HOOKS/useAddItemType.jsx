import React from 'react';
import { addItemType } from '../../utils/crud_api';

function useAddItemType() {
 const [error, setError] = React.useState(null);
 const [loading, setLoading] = React.useState(true);

 async function addingItemType({  type_name }) {
    try {
      setLoading(true);
      const response = await addItemType({  type_name });
      // Do something with the response if needed
      console.log(response);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  return { addingItemType, loading, error };
}
export default useAddItemType;