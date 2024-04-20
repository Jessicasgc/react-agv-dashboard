import React from 'react';
import PropTypes from 'prop-types';
import useAGVs from '../custom_hooks/GET_HOOKS/useAGVs';
import useAgv from '../custom_hooks/GET_HOOKS/useAgv';
import ProcessingTaskListByAGV from './Task/TaskListByAGV';
import AllocatedTaskListByAGV from './Task/TaskListByAGV';
import AGVData from './AGV/AGVData';
import { Flex, Layout } from "antd";
import useAllocatedTasks from '../custom_hooks/GET_HOOKS/useAllocatedTasks';
import useProcessingTask from '../custom_hooks/GET_HOOKS/useProcessingTask';
const { Sider } = Layout;

function SideDashboard({ isDrawerOpen }) {
    const { agvs } = useAGVs();
    const [selectedAGVId, setSelectedAGVId] = React.useState(0);
    const { agv, loading: agvDataLoading } = useAgv(selectedAGVId);
    const {task, loading: processingTaskLoading} = useProcessingTask(selectedAGVId);
    const {tasks, loading: allocatedTasksLoading} = useAllocatedTasks(selectedAGVId);
    
    const handleAGVChange = (e) => {
        setSelectedAGVId(e.target.value);
    };
    console.log(agvs, 'agv');
    const foundAGV = agvs.find(agv => agv.id === parseInt(selectedAGVId));
    // const foundProcessingTask = task.find(ts => ts.id_agv === parseInt(selectedAGVId));
    // const foundAllocatedTasks = tasks.find(task => task.id_agv === parseInt(selectedAGVId));
    console.log(task, 'processing');
    console.log(tasks, 'allocated');
   
    return (
        <Sider width="25%" className='siderStyle'>
            <div className='side-dashboard' style={{ marginLeft: isDrawerOpen ? '250px' : '0', transition: 'margin-left 0.5s' }}>
                <div className='agv-dropdown'>
                    <select id="agvSelect" value={selectedAGVId} onChange={handleAGVChange}>
                        <option value="">Select AGV</option>
                        {agvs.map((agv) => (
                            <option key={agv.id} value={agv.id}>{agv.agv_name}</option>
                        ))}
                    </select>
                </div>
                <div className='agv-data-card'>
                    {agvDataLoading ? <p>Loading AGV data...</p> : foundAGV && <AGVData {...foundAGV} />}
                </div>


                {console.log(selectedAGVId)}
                {console.log(foundAGV)}
                {/* {console.log(foundAllocatedTasks, 'processing task')}
                {console.log(foundProcessingTask, 'allocated task')} */}
                {console.log(task, 'processing')}
                {console.log(tasks, 'allocated')}
                {foundAGV && (
                    <>
                        {/* <h2>Processing Tasks</h2>
                            <div className='processing-task-card'>
                                {processingTaskLoading ? <p>Loading Processing Task data...</p> : foundProcessingTask &&<ProcessingTaskListByAGV task={foundProcessingTask} />}
                            </div>

                        <h2>Allocated Tasks</h2>
                            <div className='allocated-task-card'>
                                {allocatedTasksLoading ? <p>Loading Allocated Task data...</p> : foundAllocatedTasks &&<AllocatedTaskListByAGV {...foundAllocatedTasks} />}
                            </div> */}
                    </>
                )}
            </div>
        </Sider>
    );
    
}

SideDashboard.propTypes = {
    isDrawerOpen: PropTypes.bool.isRequired,
};

export default SideDashboard;
