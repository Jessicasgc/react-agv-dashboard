import React from 'react';
import { getItemTypes } from '../utils/crud_api';

function useItemTypes() {
 const [itemtypes, setItemTypes] = React.useState([]);
 const [loading, setLoading] = React.useState(true);

 React.useEffect(() => {
    getItemTypes().then((itemtypes) => {
      setItemTypes(itemtypes);
      setLoading(false);
    })
 }, []);

 return { itemtypes, loading };
}
export default useItemTypes;