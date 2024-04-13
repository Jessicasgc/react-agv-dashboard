import React from 'react';
import PropTypes from 'prop-types';
import useStations from '../../custom_hooks/useStations';
import useItems from '../../custom_hooks/useItems';

function AddTask({ addTask }) {
    const { stations } = useStations();
    const { items } = useItems();

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
        addTask(formData);
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
        <form className='add-task_input' onSubmit={onSubmitHandler}>
            <select
                className='add-task_dropdown'
                name='id_station_output'
                value={formData.id_station_output}
                onChange={onInputChange}
            >
                <option value=''>Select Taking Out Station</option>
                {/* Map over the stations array to populate the dropdown options */}
                {stations && stations.map((station) => (
                    <option key={station.id} value={station.id}>
                        {station.station_code}
                    </option>
                ))}
            </select>

            <select
                className='add-task_dropdown'
                name='id_station_input'
                value={formData.id_station_input}
                onChange={onInputChange}
            >
                <option value=''>Select Turning In Station</option>
                {/* Map over the stations array to populate the dropdown options */}
                {stations && stations.map(station => (
                    <option key={station.id} value={station.id}>
                        {station.station_code}
                    </option>
                ))}
            </select>

            {/* Dropdown for Item */}
            <select
                className='add-task_dropdown'
                name='id_item'
                value={formData.id_item}
                onChange={onInputChange}
            >
                <option value=''>Select Item</option>
                {/* Map over the items array to populate the dropdown options */}
                {items && items.map(item => (
                    <option key={item.id} value={item.id}>
                        {item.code}
                    </option>
                ))}
            </select>
            
            <div className='add-task_action'>
                <button className='action' type='submit'>
                    Add Task
                </button>
            </div>
        </form>
    );
}

AddTask.propTypes = {
    addTask: PropTypes.func.isRequired,
};

export default AddTask;
