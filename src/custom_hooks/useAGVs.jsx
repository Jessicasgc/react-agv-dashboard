import React from 'react';
import { getAGVs } from '../utils/crud_api';

function useAGVs() {
 const [agvs, setAgvs] = React.useState([]);
 const [loading, setLoading] = React.useState(true);

 React.useEffect(() => {
    getAGVs().then((agv) => {
      setAgvs(agv);
      setLoading(false);
    })
 }, []);

 return { agvs, loading };
}
export default useAGVs;