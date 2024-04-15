import ReusableTable from '../ReusableTable';
import useItems from '../../custom_hooks/GET_HOOKS/useItems';

function ItemsTable() {
    const { items, loading } = useItems();

    const itemColumns = [
        { key: 'id', header: 'ID' },
        { key: 'item_code', header: 'Name' },
        { key: 'item_type', header: 'Description' },
        
    ];

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
