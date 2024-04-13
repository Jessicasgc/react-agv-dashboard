import React from 'react';
import { getStations } from '../utils/crud_api';

function useStations() {
 const [stations, setStations] = React.useState([]);
 const [loading, setLoading] = React.useState(true);

 React.useEffect(() => {
    getStations().then(({station}) => {
      setStations(station);
      setLoading(false);
    })
 }, []);

 return { stations, loading };
}
export default useStations;