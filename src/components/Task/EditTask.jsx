import React from 'react';
import PropTypes from 'prop-types';
import useStations from '../../custom_hooks/GET_HOOKS/useStations';
import useItems from '../../custom_hooks/GET_HOOKS/useItems';

function EditTask({ id, editTaskById }) {
    const { stations } = useStations();
    const { items } = useItems();
    console.log(id);
    const [formData, setFormData] = React.useState({
        id_station_input: '',
        id_station_output: '',
        id_item: '',
    });

    const onInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();
        editTaskById(id, formData);
        // Reset the form data after submission
        setFormData({
            // id_agv: '',
            id_station_input: '',
            id_station_output: '',
            id_item: '',
            // task_status: '',
            // start_time: '',
            // end_time: ''
        });
    };

    return (
        <form className='task_input' onSubmit={onSubmitHandler}>
            <select
                className='task_dropdown'
                name='id_station_output'
                value={formData.id_station_output}
                onChange={onInputChange}
            >
                <option value=''>Select Taking Out Station</option>
                {/* Map over the stations array to populate the dropdown options */}
                {stations.map(station => (
                    <option key={station.id} value={station.id}>
                        {station.station_name}
                    </option>
                ))}
            </select>

            <select
                className='task_dropdown'
                name='id_station_input'
                value={formData.id_station_input}
                onChange={onInputChange}
            >
                <option value=''>Select Turning In Station</option>
                {/* Map over the stations array to populate the dropdown options */}
                {stations.map(station => (
                    <option key={station.id} value={station.id}>
                        {station.station_name}
                    </option>
                ))}
            </select>

            {/* Dropdown for Item */}
            <select
                className='task_dropdown'
                name='id_item'
                value={formData.id_item}
                onChange={onInputChange}
            >
                <option value=''>Select Item</option>
                {/* Map over the items array to populate the dropdown options */}
                {items.map(item => (
                    <option key={item.id} value={item.id}>
                        {item.item_code}
                    </option>
                ))}
            </select>
            
            <div className='task_action'>
                <button className='action' type='submit'>
                    Edit Task
                </button>
            </div>
        </form>
    );
}

EditTask.propTypes = {
    editTaskById: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
};

export default EditTask;
