import React, { useState, useEffect } from 'react';
import ReusableTable from '../ReusableTable';
import useTasks from '../../custom_hooks/GET_HOOKS/useTasks';
import DeleteTaskButton from './DeleteTaskButton';

function TaskTable() {
    const { tasks, loading } = useTasks();
    const [taskColumns, setTaskColumns] = useState([]);
    console.log("tasks:", tasks);
    console.log("taskColumns:", taskColumns);
    useEffect(() => {
        const updatedColumns = [
            { dataIndex: 'No', title: 'No' },
            { dataIndex: 'id', title: 'ID' },
            { dataIndex: 'id_item', title: 'ID ITEM' },
            { dataIndex: 'agv_code', title: 'AGV CODE' },
            { dataIndex: 'id_station_input', title: 'ID STATION INPUT' },
            { dataIndex: 'id_station_output', title: 'ID STATION OUTPUT' },
            { dataIndex: 'task_status', title: 'TASK STATUS' },
            { dataIndex: 'start_time', title: 'START TIME' },
            { dataIndex: 'end_time', title: 'END TIME' },
            { dataIndex: 'created_at', title: 'CREATED AT' },
            { dataIndex: 'updated_at', title: 'UPDATED AT' },
            {
                title: 'Action',
                key: 'action',
                render: (_, record) => (
                    <DeleteTaskButton id={record.id} onDelete={() => handleDelete(record.id)} />
                )
            }
        ];

        if (updatedColumns.length > 0) {
            for (let i = 0; i < tasks.length; i++) {
                tasks[i]['No'] = i + 1;
            }
        }

        setTaskColumns(updatedColumns);
    }, [tasks]);

    const handleDelete = (id) => {
        // Implement delete functionality here
        console.log('Deleting item with ID:', id);
    };

    return (
        <div>
            <h2>Tasks</h2>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <ReusableTable data={tasks} columns={taskColumns} />
            )}
        </div>
    );
}

export default TaskTable;
