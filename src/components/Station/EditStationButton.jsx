import React from 'react';
import PropTypes from 'prop-types';
import { BiPencil } from 'react-icons/bi';
import { editStationById } from '../../utils/crud_api';
import EditStation from './EditStation';
import { Popover } from 'antd';

function EditStationButton({ id, onStationEdited }) {
  const [visible, setVisible] = React.useState(false);

    const handleClick = () => {
        setVisible(!visible);
    };

    const handleVisibleChange = (visible) => {
        setVisible(visible);
    };

    async function onEditStationHandler( id, x, y, max_capacity){
      await editStationById(id, x, y, max_capacity);
      onStationEdited(); 
      setVisible(false);
    }
    return (
      <Popover
            content={<EditStation id={id} onStationEdited={onEditStationHandler} />}
            trigger="click"
            visible={visible}
            onVisibleChange={handleVisibleChange}
            placement="bottom"
            overlayClassName="edit-task-popover"
        >
          <button
            className='action'
            onClick={handleClick}>
            <BiPencil/>
          </button>
        </Popover>
      
    );
  }
  
  EditStationButton.propTypes = {
    id: PropTypes.number.isRequired,
    onStationEdited: PropTypes.func.isRequired,
  }
  
  export default EditStationButton;