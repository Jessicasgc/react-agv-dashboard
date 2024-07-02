import React from 'react';
import PropTypes from 'prop-types';
import { BiPencil } from 'react-icons/bi';
import { editUserById } from '../../utils/crud_api';
import EditUser from './EditUser';
import { Popover } from 'antd';

function EditUserButton({ id, onUserEdited }) {
  const [visible, setVisible] = React.useState(false);

    const handleClick = () => {
        setVisible(!visible);
    };

    const handleVisibleChange = (visible) => {
        setVisible(visible);
    };

    async function onEditUserHandler( id, type_code, type_name){
      const response = await editUserById(id, type_code, type_name);
      onUserEdited(response.data);
      console.log(response.data)
      setVisible(false);
    }
    return (
      <Popover
            content={<EditUser id={id} editUserById={onEditUserHandler} />}
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
  
  EditUserButton.propTypes = {
    id: PropTypes.number.isRequired,
    onUserEdited: PropTypes.func.isRequired,
  }
  
  export default EditUserButton;
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