import React from 'react';
import { getAGVById } from '../utils/crud_api';

function useAgv(id) {
 const [agv, setAgv] = React.useState([]);
 const [loading, setLoading] = React.useState(true);

 React.useEffect(() => {
    getAGVById(id).then((agv) => {
      setAgv(agv);
      setLoading(false);
    })
 }, [id]);

 return { agv, loading };
}
export default useAgv;