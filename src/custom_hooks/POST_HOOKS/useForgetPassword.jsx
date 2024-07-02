import React from 'react';
import { changePasswordBeforeLogin } from '../../utils/crud_api';

function useForgetPassword(){
 const [error, setError] = React.useState(null);
 const [loading, setLoading] = React.useState(true);

 async function forgetPassword({  email, current_password, new_password }) {
    try {
      setLoading(true);
      const response = await changePasswordBeforeLogin({  email, current_password, new_password });
      // Do something with the response if needed
      console.log(response);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  return { forgetPassword, loading, error };
}

export default useForgetPassword;
