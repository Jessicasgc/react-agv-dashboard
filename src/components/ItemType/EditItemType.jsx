import React from 'react';
import PropTypes from 'prop-types';
import useItemTypes from '../../custom_hooks/GET_HOOKS/useItemTypes';


function EditItemType({ id, editItemTypeById }) {
    const { itemtypes, loading:itemTypesLoading } = useItemTypes();
    console.log(id);
    const [formData, setFormData] = React.useState({
        // type_code: "",
        type_name: "",
    });

    React.useEffect(() => {
        if (itemtypes.length > 0 && !itemTypesLoading) {
          const itemtype = itemtypes.find(itemtype => itemtype.id === id);
          if (itemtype) {
            setFormData({
             type_name: itemtype.type_name || "",
            });
          }
        }
      }, [id, itemtypes, itemTypesLoading]);

    const onInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();
        editItemTypeById(id, formData);
    };

    return (
        <form className='task_input' onSubmit={onSubmitHandler}>

            <input type="text" 
                name="type_name" 
                value={formData.type_name}
                onChange={onInputChange}/>
            
            <div className='task_action'>
                <button type='submit'>
                    Edit Item
                </button>
            </div>
        </form>
    );
}

EditItemType.propTypes = {
    editItemTypeById: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
};

export default EditItemType;
