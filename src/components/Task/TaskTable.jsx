import ReusableTable from './ReusableTable';
import useTasks from '../custom_hooks/useTasks';

function TaskTable() {
    const [tasks, loading] = useTasks();

    const taskColumns = [
        { key: 'id', header: 'ID' },
        { key: 'id_item', header: 'ID ITEM' },
        { key: 'agv_code', header: 'AGV CODE' },
        { key: 'id_station_input', header: 'ID STATION INPUT' },
        { key: 'id_station_output', header: 'ID STATION OUTPUT'},
        { key: 'task_status', header: 'TASK STATUS' },
        { key: 'start_time', header: 'START TIME' },
        { key: 'end_time', header: 'END TIME' },
        { key: 'created_at', header: 'CREATED AT' },
        { key: 'updated_at', header: 'UPDATED AT' }
    ];

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