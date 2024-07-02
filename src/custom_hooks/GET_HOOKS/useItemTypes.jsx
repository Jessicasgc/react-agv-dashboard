import React from 'react';
import { getItemTypes } from '../../utils/crud_api';

function useItemTypes() {
  const [itemtypes, setItemTypes] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const fetchItemTypes = async () => {
    setLoading(true);
    const { data } = await getItemTypes();
    setItemTypes(data);
    setLoading(false);
  };

  React.useEffect(() => {
    fetchItemTypes();
  }, []);

  return { itemtypes, loading, fetchItemTypes };
}

export default useItemTypes;

