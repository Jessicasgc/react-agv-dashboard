import React from 'react';
import useAGVs from '../custom_hooks/GET_HOOKS/useAGVs';
import useAgv from '../custom_hooks/GET_HOOKS/useAgv';
import ProcessingTaskListByAGV from './Task/TaskListByAGV';
import AllocatedTaskListByAGV from './Task/TaskListByAGV';
import AGVData from './AGV/AGVData';

function SideDashboard(){
   const { agvs } = useAGVs();
   const [selectedAGVId, setSelectedAGVId] = React.useState('');
   const { agv, loading: agvDataLoading } = useAgv(selectedAGVId);
 
   const handleAGVChange = (e) => {
      setSelectedAGVId(e.target.value);
   };

   return(
      <div className='side-dashboard'>
         <div className='agv-dropdown'>
            <select id="agvSelect" value={selectedAGVId} onChange={handleAGVChange}>
               <option value="">Select AGV</option>
               {agvs.map(agv => (
                  <option key={agv.id} value={agv.id}>{agv.agv_name}</option>
               ))}
            </select>
         </div>
         <div className='agv-data-card'>
            {agvDataLoading ? <p>Loading AGV data...</p> : selectedAGVId && <AGVData {...agv} />}
         </div>
         
         {selectedAGVId && (
                <>
                     <h2>Processing Tasks</h2>
                     <div className='processing-task-card'>
                       <ProcessingTaskListByAGV agvId={selectedAGVId} />
                     </div>
                    
                     <h2>Allocated Tasks</h2>
                     <div className='allocated-task-card'>
                       <AllocatedTaskListByAGV agvId={selectedAGVId} />
                     </div>
                </>
            )}
      </div>
    );
}



export default SideDashboard;