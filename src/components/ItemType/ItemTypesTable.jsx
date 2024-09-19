import React, { useState, useEffect } from 'react';
import ReusableTable from '../ReusableTable';
import useItemTypes from '../../custom_hooks/GET_HOOKS/useItemTypes';
import DeleteButton from '../DeleteButton';
import ThemeContext from '../../contexts/ThemeContext';
import EditItemTypeButton from './EditItemTypeButton';
import { deleteItemTypeById } from '../../utils/crud_api';
import LocaleContext from '../../contexts/LocaleContext';
import AddItemTypeButton from './AddItemTypeButton';

function ItemTypesTable() {
    const { locale } = React.useContext(LocaleContext);
    const { theme } = React.useContext(ThemeContext);
    const { itemtypes, loading, fetchItemTypes } = useItemTypes();
    const [itemTypesColumns, setItemTypesColumns] = useState([]);

    useEffect(() => {
        const updatedColumns = [
            { dataIndex: 'No', title: 'No' },
            { dataIndex: 'id', title: 'ID' },
            { dataIndex: 'type_code', title: locale === 'id' ? 'Kode Tipe' : 'Type Code' },
            { dataIndex: 'type_name', title: locale === 'id' ? 'Nama Tipe' : 'Type Name' },
            {
                title: locale === 'id' ? 'Aksi' : 'Action',
                key: 'action',
                render: (_, record) => (
                    <div className='set-icon'>
                        <EditItemTypeButton id={record.id} onItemTypeEdited={fetchItemTypes} />
                        <DeleteButton id={record.id} onDelete={() => handleDelete(record.id)} />
                    </div>
                )
            }
        ];

        if (itemtypes.length > 0) {
            for (let i = 0; i < itemtypes.length; i++) {
                itemtypes[i]['No'] = i + 1;
            }
            setItemTypesColumns(updatedColumns);
        } else {
            setItemTypesColumns([]); // Handle case when itemtypes is empty
        }
    }, [locale, itemtypes]);

    const handleDelete = (id) => {
        deleteItemTypeById(id);
        fetchItemTypes(); // Fetch updated item types after deletion
        console.log('Deleting item type with ID:', id);
    };

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <AddItemTypeButton onItemTypeAdded={fetchItemTypes} />
                    {itemtypes.length > 0 && (
                        <ReusableTable data={itemtypes} columns={itemTypesColumns} theme={theme} />
                    )}
                </>
            )}
        </div>
    );
}

export default ItemTypesTable;
