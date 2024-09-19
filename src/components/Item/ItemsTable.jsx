import React, { useState, useEffect } from 'react';
import ReusableTable from '../ReusableTable';
import useItems from '../../custom_hooks/GET_HOOKS/useItems';
import useItemTypes from '../../custom_hooks/GET_HOOKS/useItemTypes';
import DeleteButton from '../DeleteButton';
import ThemeContext from '../../contexts/ThemeContext';
import EditItemButton from './EditItemButton';
import { deleteItemById } from '../../utils/crud_api';
import LocaleContext from '../../contexts/LocaleContext';
import useStations from '../../custom_hooks/GET_HOOKS/useStations';
import AddItemButton from './AddItemButton';

function ItemsTable() {
    const { locale } = React.useContext(LocaleContext);
    const { items, loading, fetchItems } = useItems();
    const { stations } = useStations();
    const { theme } = React.useContext(ThemeContext);
    const { itemtypes, loading: itemTypeLoading, fetchItemTypes } = useItemTypes();
    const [itemColumns, setItemColumns] = useState([]);

    useEffect(() => {
        const updatedColumns = [
            { dataIndex: 'No', title: 'No' },
            { dataIndex: 'id', title: 'ID' },
            { dataIndex: 'item_code', title: locale === 'id' ? 'Kode Barang' : 'Item Code' },
            { dataIndex: 'item_name', title: locale === 'id' ? 'Nama Barang' : 'Item Name' },
            {
                dataIndex: 'id_type',
                title: locale === 'id' ? 'Nama Tipe' : 'Type Name',
                render: (typeId) => {
                    const foundType = itemtypes.find(type => type.id === typeId);
                    return foundType ? foundType.type_name : itemTypeLoading ? 'Loading...' : 'Unknown';
                }
            },
            {
                dataIndex: 'id_station',
                title: locale === 'id' ? 'Lokasi Barang' : 'Items Location',
                render: (id_station) => {
                    const foundStation = stations.find(station => station.id === id_station);
                    return foundStation ? foundStation.station_name : 'Home';
                }
            },
            {
                title: locale === 'id' ? 'Aksi' : 'Action',
                key: 'action',
                render: (_, record) => (
                    <div className='set-icon'>
                        <EditItemButton id={record.id} onItemEdited={fetchItems} />
                        <DeleteButton id={record.id} onDelete={() => handleDelete(record.id)} />
                    </div>
                )
            }
        ];

        if (items.length > 0) {
            for (let i = 0; i < items.length; i++) {
                items[i]['No'] = i + 1;
            }
            setItemColumns(updatedColumns);
        } else {
            setItemColumns([]);
        }
    }, [locale, items, itemtypes, itemTypeLoading, stations]);

    const handleDelete = (id) => {
        deleteItemById(id);
        fetchItems(); 
        console.log('Deleting item with ID:', id);
    };

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <AddItemButton onItemAdded={fetchItems} />
                    {items.length > 0 && (
                        <ReusableTable data={items} columns={itemColumns} theme={theme} />
                    )}
                </>
            )}
        </div>
    );
}

export default ItemsTable;
