import React from 'react';
import { getUserLogged } from '../../utils/crud_api';

function useProfile() {
    const [ profile, setProfile ] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const fetchProfile = async () => {
      setLoading(true);
      const { data } = await getUserLogged();
      setProfile(data);
      setLoading(false);
    }
    React.useEffect(() => {
      fetchProfile();
    }, []);
   
    return { profile, loading };
   }
export default useProfile;