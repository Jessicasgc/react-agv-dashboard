import React from 'react';
import { getItemTypes } from '../utils/crud_api';

function useItemTypes() {
 const [itemtypes, setItemTypes] = React.useState([]);
 const [loading, setLoading] = React.useState(true);

 React.useEffect(() => {
    getItemTypes().then(({itemtype}) => {
      setItemTypes(itemtype);
      setLoading(false);
    })
 }, []);

 return { itemtypes, loading };
}
export default useItemTypes;