import ReusableTable from './ReusableTable';
import useItems from '../custom_hooks/useItems';

function ItemTable() {
    const { items, loading } = useItems();

    const itemColumns = [
        { key: 'id', header: 'ID' },
        { key: 'name', header: 'Name' },
        { key: 'description', header: 'Description' }
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

export default ItemTable;
