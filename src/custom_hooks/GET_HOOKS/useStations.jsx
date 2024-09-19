import React from 'react';
import { getStations } from '../../utils/crud_api';

function useStations() {
 const [stations, setStations] = React.useState([]);
 const [loading, setLoading] = React.useState(true);

  const fetchStations = async () => {
        setLoading(true);
        const { data } = await getStations();
        setStations(data);
        setLoading(false);
    };

    React.useEffect(() => {
        fetchStations();
    }, []);

    return { stations, loading, fetchStations, setStations };
}
export default useStations;
