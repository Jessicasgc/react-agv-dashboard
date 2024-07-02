import React from 'react';
// import { useSearchParams } from 'react-router-dom';
// import NoteList from '../components/NoteList';
// import SearchBar from '../components/SearchBar';
// import {  getActiveNotes } from '../utils/network-data';
// import { BiPlus } from 'react-icons/bi';
// import { Link } from 'react-router-dom';
import LocaleContext from '../contexts/LocaleContext';
import ItemsTable from "../components/Item/ItemsTable";
import { Layout } from "antd";
import ItemTypesTable from "../components/ItemType/ItemTypesTable";
import AddItemTypeButton from "../components/ItemType/AddItemTypeButton";
import AddItemButton from "../components/Item/AddItemButton";
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
        {/* </Content> */}
        </Content> 
        
    )
        
}
export default ItemsPage;