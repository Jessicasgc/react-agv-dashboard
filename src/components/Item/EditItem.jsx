import React from 'react';
import PropTypes from 'prop-types';
import useItems from '../../custom_hooks/GET_HOOKS/useItems';
import useItemTypes from '../../custom_hooks/GET_HOOKS/useItemTypes';


function EditItem({ id, editItemById }) {
    const { itemtypes } = useItemTypes();
    const { items, loading: itemsLoading } = useItems();
    console.log(id);
    const [formData, setFormData] = React.useState({
        id_type: "",
        item_name: "",
    });

    React.useEffect(() => {
        if (items.length > 0 && !itemsLoading) {
          const item = items.find(item => item.id === id);
          if (item) {
            setFormData({
              id_type: item.id_type || "",
              item_name: item.item_name || "",
            });
          }
        }
      }, [id, items, itemsLoading]);

    const onInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        await editItemById(id, formData);
    };

    return (
        <form className='task_input' onSubmit={onSubmitHandler}>
            <select
                className='task_dropdown'
                name="id_type"
                value={formData.id_type}
                onChange={onInputChange}
            >
                <option value="">Select Item Type</option>
                {/* Map over the stations array to populate the dropdown options */}
                {itemtypes.map((itemtype) => (
                    <option key={itemtype.id} value={itemtype.id} selected={itemtype.id === formData.id_type}>
                        {itemtype.type_name}
                    </option>
                ))}
            </select>

            <input type="text" 
                name="item_name" 
                value={formData.item_name}
                onChange={onInputChange}/>
            
            <div className='task_action'>
                <button type='submit'>
                    Edit Item
                </button>
            </div>
        </form>
    );
}

EditItem.propTypes = {
    editItemById: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
};

export default EditItem;
