import React from 'react';
import PropTypes from 'prop-types';
import { FaPlusCircle } from 'react-icons/fa';
import { Popover } from 'antd';
import AddItemType from './AddItemType';
import useAddItemType from '../../custom_hooks/POST_HOOKS/useAddItemType';
import useItemTypes from '../../custom_hooks/GET_HOOKS/useItemTypes';
// import { addItemType } from '../../utils/crud_api';

function AddItemTypeButton({onItemTypeAdded}) {
    const [open, setOpen] = React.useState(false);
    const { fetchItemTypes } = useItemTypes();
    const { addingItemType } = useAddItemType(fetchItemTypes);


    const hide = () => {
        setOpen(false);
    };

    const handleOpenChange = (newOpen) => {
        setOpen(newOpen);
    };
    
      
    async function onAddItemTypeHandler({ type_name}){
        await addingItemType({ type_name });
        onItemTypeAdded();
        hide();
    }
    
    return (
        <Popover
            content={<a><AddItemType onItemTypeAdded={onAddItemTypeHandler}/></a>}
            title="Add Item Type"
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

AddItemTypeButton.propTypes = {
    onItemTypeAdded: PropTypes.func.isRequired,
}

export default AddItemTypeButton;
