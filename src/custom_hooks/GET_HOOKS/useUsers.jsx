
import React from 'react';
import { getUsers } from '../../utils/crud_api';

function useUsers() {
    const [ users, setUsers ] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
   
    React.useEffect(() => {
       getUsers().then(({data}) => {
         setUsers(data);
         setLoading(false);
       })
    }, []);
   
    return { users, loading, setUsers };
   }
   export default useUsers;