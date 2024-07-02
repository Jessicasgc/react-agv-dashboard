import React from 'react';
import PropTypes from 'prop-types';
import { BiPencil } from 'react-icons/bi';
import { editItemTypeById } from '../../utils/crud_api';
import EditItemType from './EditItemType';
import { Popover } from 'antd';

function EditItemTypeButton({ id, onItemTypeEdited }) {
  const [visible, setVisible] = React.useState(false);

    const handleClick = () => {
        setVisible(!visible);
    };

    const handleVisibleChange = (visible) => {
        setVisible(visible);
    };

    async function onEditItemTypeHandler( id, type_name){
      await editItemTypeById(id, type_name);
      onItemTypeEdited();
      setVisible(false);
    }
    return (
      <Popover
            content={<EditItemType id={id} editItemTypeById={onEditItemTypeHandler} />}
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
  
  EditItemTypeButton.propTypes = {
    id: PropTypes.number.isRequired,
    onItemTypeEdited: PropTypes.func.isRequired,
  }
  
  export default EditItemTypeButton;
