import React from 'react';
import PropTypes from 'prop-types';
import { BiPencil } from 'react-icons/bi';
import { editTaskById } from '../../utils/crud_api';
import EditTask from './EditTask';
import { Popover } from 'antd';

function EditTaskButton({ id }) {
  const [visible, setVisible] = React.useState(false);

    const handleClick = () => {
        setVisible(!visible);
    };

    const handleVisibleChange = (visible) => {
        setVisible(visible);
    };

    function onEditTaskHandler({ id, id_station_input, id_station_output, id_item}){
      editTaskById( id, {id_station_input, id_station_output, id_item});
      
      setVisible(false);
    }
    return (
      <Popover
            content={<EditTask id={id} editTaskById={onEditTaskHandler} />}
            trigger="click"
            visible={visible}
            onVisibleChange={handleVisibleChange}
            placement="bottom"
            overlayClassName="edit-task-popover"
        >
          <button
            className='icon'
            onClick={handleClick}>
            <BiPencil/>
          </button>
        </Popover>
      
    );
  }
  
  EditTaskButton.propTypes = {
    id: PropTypes.number.isRequired,
  }
  
  export default EditTaskButton;