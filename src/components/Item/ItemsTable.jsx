import React, { useState, useEffect } from 'react';
import ReusableTable from '../ReusableTable';
import useItems from '../../custom_hooks/GET_HOOKS/useItems';
import useItemTypes from '../../custom_hooks/GET_HOOKS/useItemTypes';
import DeleteItemButton from './DeleteItemButton';

function ItemsTable() {
    const { items, loading } = useItems();
    const { itemTypes } = useItemTypes();

    const [itemColumns, setItemColumns] = useState([]);

    useEffect(() => {
        const updatedColumns = [
            { dataIndex: 'No', title: 'No' },
            { dataIndex: 'id', title: 'ID' },
            { dataIndex: 'item_code', title: 'Item Code' },
            { dataIndex: 'item_name', title: 'Item Name' },
            {
                dataIndex: 'type_id',
                title: 'Type Name',
                render: (typeId) => {
                    if (!itemTypes || !Array.isArray(itemTypes) || itemTypes.length === 0) {
                        return 'Unknown';
                    }
                    const foundType = itemTypes.find(type => type.id === typeId);
                    return foundType ? foundType.name : 'Unknown';
                }
            },
            {
                title: 'Action',
                key: 'action',
                render: (_, record) => (
                    <DeleteItemButton id={record.id} onDelete={() => handleDelete(record.id)} />
                )
            }
        ];

        if (updatedColumns.length > 0) {
            for (let i = 0; i < items.length; i++) {
                items[i]['No'] = i + 1;
            }
        }

        setItemColumns(updatedColumns);
    }, [items, itemTypes]);

    const handleDelete = (id) => {
        // Implement delete functionality here
        console.log('Deleting item with ID:', id);
    };

    return (
        <div>
            <h2>Items</h2>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <ReusableTable data={items} columns={itemColumns} />
            )}
        </div>
    );
}

export default ItemsTable;
