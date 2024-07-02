import React from 'react';
import { getItems } from '../../utils/crud_api';

function useItems() {
  const [items, setItems] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const fetchItems = async () => {
    setLoading(true);
    const { data } = await getItems();
    setItems(data);
    setLoading(false);
  };

  React.useEffect(() => {
    fetchItems();
  }, []);

  return { items, loading, fetchItems };
}

export default useItems;