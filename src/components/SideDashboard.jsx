import React, { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import useAGVs from '../custom_hooks/GET_HOOKS/useAGVs';
// import useAgv from '../custom_hooks/GET_HOOKS/useAgv';
import { ProcessingTaskListByAGV } from './Task/TaskListByAGV';
import {AllocatedTaskListByAGV} from './Task/TaskListByAGV';
import AGVData from './AGV/AGVData';
import { Alert, Card, Flex, Layout, Select, Form } from "antd";
import useAllocatedTasks from '../custom_hooks/GET_HOOKS/Tasks/useAllocatedTasks';
import useProcessingTask from '../custom_hooks/GET_HOOKS/Tasks/useProcessingTask';
// import { agvDatas } from './Map';
// import { useSignal } from '@preact/signals';
import { useWebSocket } from 'react-use-websocket/dist/lib/use-websocket';
import { SERVICE_URL } from '../utils/constants';
const { Sider } = Layout;
const { Option } = Select;
import { deleteTaskById } from '../utils/crud_api';
import useTasks from '../custom_hooks/GET_HOOKS/Tasks/useTasks';
function SideDashboard({ isDrawerOpen }) {
    const { sendJsonMessage, lastMessage, readyState} = useWebSocket(SERVICE_URL, {shouldReconnect: (closeEvent) => true,});
    const { agvs } = useAGVs();
    const [ datas, setDatas ] = useState([]);
    const [selectedAGVId, setSelectedAGVId] = React.useState('');
    // const { agv, loading: agvDataLoading } = useAgv(selectedAGVId);
    const {task, loading: processingTaskLoading, fetchProcessingTask} = useProcessingTask(selectedAGVId);
    const {tasks, loading: allocatedTasksLoading, fetchAllocatedTasks} = useAllocatedTasks(selectedAGVId);
    const {setTasks, fetchTasks} = useTasks();
    
    const handleAGVChange = (value) => {
        setSelectedAGVId(value);
    };
    useEffect(() => {
        if (lastMessage !== null) {
            let res = JSON.parse(lastMessage.data)
            
            if(!res.type) return
            
            if(res.type == "update") setDatas(res.data) ;
        }
      }, [lastMessage]);
     
      useEffect(() => {
          if (selectedAGVId) {
              fetchProcessingTask(selectedAGVId);
              fetchAllocatedTasks(selectedAGVId);
          }
      }, [selectedAGVId]);
      const filteredProcessingTasks = useMemo(() => {
        return task.filter(t => t.id_agv === parseInt(selectedAGVId));
    }, [task, selectedAGVId, setTasks]);

    const filteredAllocatedTasks = useMemo(() => {
        return tasks.filter(t => t.id_agv === parseInt(selectedAGVId));
    }, [tasks, selectedAGVId, setTasks]);
      const handleDeleteTask = async (id) => {
        await deleteTaskById(id);
        fetchTasks();
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    };
    return (
        <Sider width="20%" className='siderStyle'>
            {/* <div style={{ marginLeft: isDrawerOpen ? '250px' : '0', transition: 'margin-left 0.5s' }}> */}
               
                <Flex vertical align={'center'} style={{marginTop: "15px"}}>
                    <Alert style={{width: '87%', marginBottom:10,}} message={readyState ==  WebSocket.OPEN ? "Service Connected" : "Service Disconnected"} type={readyState ==  WebSocket.OPEN ? "success" : "error"} showIcon></Alert>
                    {
                        readyState ==  WebSocket.OPEN && 
                        datas.map(agv => <AGVData {...agv} key={agv.id} />)
                        // agvs.map(agv => <AGVData {...agv} key={agv.id} />)
                    }
                    {/* {agvDataLoading ? <p>Loading AGV data...</p> : foundAGV && <AGVData {...foundAGV} />} */}
                </Flex>
                
                <Form>
                    <Form.Item className="form-item-container" name='id-agv' label='Select AGV'>
                        <Select
                            placeholder="Select AGV"
                            className="agv-select"
                            onChange={handleAGVChange}
                            value={selectedAGVId}
                        
                            >
                            {agvs.map((agv) => (
                            <Option key={agv.id} value={agv.id}>
                                {agv.agv_name}
                            </Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Form>
                {selectedAGVId && (
                    <>
                        <h2>Processing Tasks</h2>
                        {processingTaskLoading ? (
                            <p>Loading Processing Task data...</p>
                        ) : (
                            filteredProcessingTasks.length > 0 ? (
                                <ProcessingTaskListByAGV task={filteredProcessingTasks} onDelete={handleDeleteTask} />
                            ) : (
                                <p>No processing task data from this AGV</p>
                            )
                        )}

                        <h2>Allocated Tasks</h2>
                        {allocatedTasksLoading ? (
                            <p>Loading Allocated Task data...</p>
                        ) : (
                            filteredAllocatedTasks.length > 0 ? (
                                <AllocatedTaskListByAGV tasks={filteredAllocatedTasks} onDelete={handleDeleteTask} />
                            ) : (
                                <p>No allocated tasks data from this AGV</p>
                            )
                        )}
                    </>
                )}
            {/* </div> */}
        </Sider>
    );
    
}

SideDashboard.propTypes = {
    isDrawerOpen: PropTypes.bool.isRequired,
};

export default SideDashboard;
