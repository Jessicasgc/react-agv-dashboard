// import { useState, useEffect } from 'react';
// import { getUserLogged, get5LogAuth, getLogActionAuthedUser } from '../../utils/crud_api';

// const useProfile = () => {
//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [logAuth, setLogAuth] = useState([]);
//   const [logAction, setLogAction] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       const profileData = await getUserLogged();
//       const logAuthData = await get5LogAuth();
//       const logActionData = await getLogActionAuthedUser();

//       setProfile(profileData);
//       setLogAuth(logAuthData.data || []);
//       setLogAction(logActionData.data || []);
//       setLoading(false);
//     };

//     fetchData();
//   }, []);

//   return { profile, logAuth, logAction, loading };
// };

// export default useProfile;

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