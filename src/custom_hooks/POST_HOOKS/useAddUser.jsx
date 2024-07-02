import React from 'react';
import { register } from '../../utils/crud_api';

function useAddUser(fetchUsers) {
 const [error, setError] = React.useState(null);
 const [loading, setLoading] = React.useState(true);

 async function addingUser({  name, role, email, password }) {
    try {
      setLoading(true);
      const response = await register({  name, role, email, password });
      fetchUsers();
      console.log(response);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  return { addingUser, loading, error };
}
export default useAddUser;