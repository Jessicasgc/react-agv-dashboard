import React from 'react';
import PropTypes from 'prop-types';
import { BiPencil } from 'react-icons/bi';
import { editItemById } from '../../utils/crud_api';
import EditItem from './EditItem';
import { Popover } from 'antd';

function EditItemButton({ id, onItemEdited }) {
  const [visible, setVisible] = React.useState(false);

    const handleClick = () => {
        setVisible(!visible);
    };

    const handleVisibleChange = (visible) => {
        setVisible(visible);
    };

    async function onEditItemHandler( id, id_type, item_name){
      await editItemById(id, id_type, item_name);
      onItemEdited();
      setVisible(false);
    }
    return (
      <Popover
            content={<EditItem id={id} editItemById={onEditItemHandler} />}
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
  
  EditItemButton.propTypes = {
    id: PropTypes.number.isRequired,
    onItemEdited: PropTypes.func.isRequired,
  }
  
  export default EditItemButton;
//   const onEditItemHandler = (id, id_type, item_name) => {
//     editItemById(id, id_type, item_name);
//   };
  
//   const MyComponent = () => {
//     return (
//       <EditItemButton
//         id={1}
//         EditComponent={EditTask}
//         onEditItem={onEditItemHandler}
//         editComponentProps={{ additionalProp: 'id, id_type, item_name' }} // Pass any additional props if needed
//       />
//     );
//   };
  
//   export default MyComponent;