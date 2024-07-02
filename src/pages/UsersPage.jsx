import React from "react";
import UsersTable from "../components/User/UsersTable";
import { Layout } from "antd";
const { Content } = Layout;
import LocaleContext from "../contexts/LocaleContext";

function UsersPage() {
    const {locale} = React.useContext(LocaleContext);
    return (
        <Content>
        <h2 className='page-name'>{locale === 'id' ? 'Halaman Data Pengguna' : 'Users Data Page'}</h2>
        <div className="table-container"> 
            <UsersTable /> 
        </div>
      
        </Content> 
        
    )
        
}
export default UsersPage;