import React from "react";
import StationsTable from "../components/Station/StationsTable";
import { Layout } from "antd";
const { Content } = Layout;
import useStations from "../custom_hooks/GET_HOOKS/useStations";
import LocaleContext from "../contexts/LocaleContext";

function StationsPage() {
    const { stations, loading} = useStations();
    const {locale} = React.useContext(LocaleContext);
    return (
        
        <Content>
          <h1 className="page-name">{locale=='id'? 'Halaman Stasiun':'Stations Page'}</h1>
          <div className="table-container"> 
            <StationsTable stations={stations} loading={loading}/> 
         </div>
      
        </Content> 
        
    )
        
}
export default StationsPage;