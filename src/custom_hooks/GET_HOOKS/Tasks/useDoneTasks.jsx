import React from 'react';
import { getDoneTasks } from '../../../utils/crud_api'; // Pastikan path ini sesuai dengan lokasi fungsi getDoneTasks Anda

function useDoneTasks() {
  const [doneTasks, setDoneTasks] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    getDoneTasks().then(({data}) => {
      setDoneTasks(data);
      setLoading(false);
    })
  }, []);

  return { doneTasks, loading, setDoneTasks };
}

export default useDoneTasks;

