import React, { useState, useEffect } from 'react';
import ReusableTable from '../ReusableTable';
import useTasks from '../../custom_hooks/GET_HOOKS/Tasks/useTasks';
import DeleteButton from '../DeleteButton';
import LocaleContext from '../../contexts/LocaleContext';
import ThemeContext from '../../contexts/ThemeContext';
import { deleteTaskById } from '../../utils/crud_api';
import useStations from '../../custom_hooks/GET_HOOKS/useStations';
import useItems from '../../custom_hooks/GET_HOOKS/useItems';
import useDoneTasks from '../../custom_hooks/GET_HOOKS/Tasks/useDoneTasks';
import useAGVs from '../../custom_hooks/GET_HOOKS/useAGVs';

function TaskTable() {
    const {locale} = React.useContext(LocaleContext);
    const {theme} = React.useContext(ThemeContext);
    const {doneTasks, loading, setDoneTasks } = useDoneTasks();
    const { stations } = useStations();
    const { agvs } = useAGVs();
    const { items } = useItems();
    const [taskColumns, setTaskColumns] = useState([]);

    console.log("tasks:", doneTasks);
    console.log("taskColumns:", taskColumns);
    const updatedColumns = [
        { dataIndex: 'No', title: 'No' },
        { dataIndex: 'id', title: 'ID' },
        { dataIndex: 'task_code', title: locale === 'id' ? 'KODE TUGAS': 'TASK CODE' },
        { dataIndex: 'id_item', title: locale === 'id' ? 'ID BARANG': 'ID ITEM',
            render: (id_item) => {
                const foundItem = items.find(item => item.id === id_item);
                return foundItem ? foundItem.item_name : 'Unknown';
            }
         },
        { dataIndex: 'id_agv', title: locale === 'id' ? 'NAMA AGV' :'AGV NAME',
            render: (id_agv) => {
                const foundAGV = agvs.find(agv => agv.id === id_agv);
                return foundAGV ? foundAGV.agv_name : 'Unknown';
            }
         },
        { dataIndex: 'id_start_station', title: locale === 'id' ? 'ID STATION MULAI':'ID START STATION',
            render: (id_start_station) => {
                const foundStation = stations.find(station => station.id === id_start_station);
                return foundStation ? foundStation.station_name : '-';
            }
         },
        { dataIndex: 'id_destination_station', title: locale === 'id' ? 'ID STATION TUJUAN': 'ID DESTINATION STATION', 
            render: (id_destination_station) => {
                const foundStation = stations.find(station => station.id === id_destination_station);
                return foundStation ? foundStation.station_name : '-';
            }
         },
        { dataIndex: 'task_status', title: locale === 'id' ? 'STATUS TUGAS':'TASK STATUS' },
        { dataIndex: 'start_time', title: locale === 'id' ? 'WAKTU MULAI' : 'START TIME' },
        { dataIndex: 'end_time', title: locale === 'id' ? 'WAKTU AKHIR' : 'END TIME' },
        { dataIndex: 'created_at', title: locale === 'id' ? 'TERBUAT SAAT' : 'CREATED AT' },
        { dataIndex: 'updated_at', title: locale === 'id' ? 'TERBARUI SAAT' : 'UPDATED AT' },
        {
            title: locale === 'id' ? 'AKSI' : 'ACTION',
            key: 'action',
            render: (_, record) => (
                <div className='set-icon'>
                    {/* <EditTaskButton id = {record.id} /> */}
                    <DeleteButton id={record.id} onDelete={() => handleDelete(record.id)} />
                </div>
                
            )
        }
    ];
    useEffect(() => {
        if (updatedColumns.length > 0) {
            for (let i = 0; i < doneTasks.length; i++) {
                doneTasks[i]['No'] = i + 1;
            }
        }
        setTaskColumns(updatedColumns);
    }, [locale, doneTasks]);

    const handleDelete = async (id) => {
        // Implement delete functionality here
        await deleteTaskById(id);
        setDoneTasks(prevTasks => prevTasks.filter(task => task.id !== id))
        console.log('Deleting item with ID:', id);
    };
    // const handleUserEdit = (updatedUser) => {
    //     setUsers(prevUsers =>
    //         prevUsers.map(user =>
    //             user.id === updatedUser.id ? updatedUser : user
    //         )
    //     );
    // };
    // const handleDelete = async(id) => {
    //     await deleteUserById(id);
    //     setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
    //     console.log('Deleting item with ID:', id)
    // };
    // const handleUserRegister = async (newUser) => {
    //     setUsers(prevUsers => [...prevUsers, newUser]);
    // };

    return (
        <div>
            {/* <h2>Tasks</h2> */}
            {loading ? (
                <p>Loading...</p>
            ) : (
                <ReusableTable data={doneTasks} columns={taskColumns} theme={theme}/>
            )}
        </div>
    );
}

export default TaskTable;
