import React from 'react';
import { FaPlusCircle } from 'react-icons/fa';
import { Popover } from 'antd';
import AddStation from './AddStation';
import PropTypes from 'prop-types';
import useAddStation from '../../custom_hooks/POST_HOOKS/useAddStation';
import useStations from '../../custom_hooks/GET_HOOKS/useStations';

function AddStationButton({onStationAdded}) {
    const [open, setOpen] = React.useState(false);
    const { fetchStations } = useStations();
    const { addingStation } = useAddStation(fetchStations);
    
    const hide = () => {
        setOpen(false);
    };

    // Handle popover visibility change
    const handleOpenChange = (newOpen) => {
        setOpen(newOpen);
    };
    
    const onAddStationHandler = async (id, x, y, max_capacity) => {
        await addingStation(id, x, y, max_capacity);
        onStationAdded();
        hide();
        
        console.log('Station added and fetchStations called');
    };
    
    return (
        <Popover
            content={<a><AddStation onStationAdded={onAddStationHandler}/></a>}
            title="Add Station"
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

AddStationButton.propTypes = {
    onStationAdded: PropTypes.func.isRequired,
}
export default AddStationButton;
