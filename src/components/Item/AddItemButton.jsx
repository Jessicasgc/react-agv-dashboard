import React from 'react';
import PropTypes from 'prop-types';
import { FaPlusCircle } from 'react-icons/fa';
import { Popover } from 'antd';
import AddItem from './AddItem';
import useItems from '../../custom_hooks/GET_HOOKS/useItems';
import useAddItem from '../../custom_hooks/POST_HOOKS/useAddItem';

function AddItemButton({onItemAdded}) {
    const [open, setOpen] = React.useState(false);
    const { fetchItems } = useItems();
    const { addingItem } = useAddItem(fetchItems)

    const hide = () => {
        setOpen(false);
    };

    // Handle popover visibility change
    const handleOpenChange = (newOpen) => {
        setOpen(newOpen);
    };
    
      
    async function onAddItemHandler( id_type, item_name){
        await addingItem( id_type, item_name );
        onItemAdded();
        hide();
    }
    
    return (
        <Popover
            content={<a><AddItem onItemAdded={onAddItemHandler} /></a>}
            title="Add Item"
            trigger="click"
            open={open}
            onOpenChange={handleOpenChange}
            placement="bottom"
            overlayClassName="add-task-popover"
        >
            <button className='icon-add-task'> 
                <FaPlusCircle />
            </button>
        </Popover>
    );
}


AddItemButton.propTypes = {
    onItemAdded: PropTypes.func.isRequired,
};

export default AddItemButton;
