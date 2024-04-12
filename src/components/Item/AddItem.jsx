import React from 'react';
import PropTypes from 'prop-types';
//import useAGVs from '../custom_hooks/useAGVs';
import useItemTypes from '../custom_hooks/useItemTypes';

function AddItem({ addItem }) {
    const { itemtypes } = useItemTypes();

    const [formData, setFormData] = React.useState({
        id_type: '',
        type_name: ''
    });

    const onInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();
        addItem(formData);
        // Reset the form data after submission
        setFormData({
            id_type: '',
            type_name: ''
            
        });
    };

    return (
        <form className='add-item_input' onSubmit={onSubmitHandler}>
             <label className='add-item_label'>Item Type</label>
            <select
                className='add-item_dropdown'
                name='id_type'
                value={formData.id_type}
                onChange={onInputChange}
            >
                <option value=''>Select Type of Item</option>
                {/* Map over the stations array to populate the dropdown options */}
                {itemtypes.map(itemtype => (
                    <option key={itemtype.id} value={itemtype.id}>
                        {itemtype.station_code}
                    </option>
                ))}
            </select>

            <label className='add-item_label'>Item Name</label>
            <input className='add-item_input'
                       type='text' 
                       placeholder='Item Name' 
                       value={this.state.title} 
                       onChange={this.onTitleChangeEventHandler}/>
            <div className='add-task_action'>
                <button className='action' type='submit'>
                    Add Item
                </button>
            </div>
        </form>
    );
}

AddItem.propTypes = {
    addItem: PropTypes.func.isRequired,
};

export default AddItem;
