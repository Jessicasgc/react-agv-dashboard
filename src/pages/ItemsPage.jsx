import React from 'react';
import LocaleContext from '../contexts/LocaleContext';
import ItemsTable from "../components/Item/ItemsTable";
import { Layout } from "antd";
import ItemTypesTable from "../components/ItemType/ItemTypesTable";
const { Content } = Layout;

function ItemsPage() {
    const {locale} = React.useContext(LocaleContext);

    return (
        <Content>
            <h1 style={{alignItems:"center"}} className='page-name'>{locale === 'id' ? 'Tipe Barang': 'Item Type'}</h1>
            <div className="table-container"> 
                <ItemTypesTable/>
            </div>
            <h1 className='page-name'>{locale === 'id' ? 'Barang': 'Item'}</h1>
            <div className="table-container"> 
                <ItemsTable /> 
            </div>
        </Content> 
        
    )
        
}
export default ItemsPage;