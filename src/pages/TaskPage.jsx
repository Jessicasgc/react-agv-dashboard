import React from 'react';
import LocaleContext from '../contexts/LocaleContext';
import TaskTable from '../components/Task/TaskTable';
import { Layout } from "antd";
const { Content } = Layout;

function TaskPage() {
    const {locale} = React.useContext(LocaleContext);

    return (
        <Content>
            <h2 className='page-name'>{locale === 'id' ? 'Sejarah Tugas' : 'Tasks History'}</h2>
            <div className="table-container">
                <TaskTable/>
            </div>
        </Content> 
    )   
}
export default TaskPage;