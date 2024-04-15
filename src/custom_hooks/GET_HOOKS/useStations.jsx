import React from 'react';
import { getStations } from '../../utils/crud_api';

function useStations() {
 const [stations, setStations] = React.useState([]);
 const [loading, setLoading] = React.useState(true);

 React.useEffect(() => {
    getStations().then(({data}) => {
      setStations(data);
      setLoading(false);
    })
 }, []);

 return { stations, loading };
}
export default useStations;