import React from 'react';
import PropTypes from 'prop-types';
import { BiPencil } from 'react-icons/bi';
import { Popover } from 'antd';

function ReusableEditButton({ id, EditComponent, onEditItem, editComponentProps }) {
  const [visible, setVisible] = React.useState(false);

  const handleClick = () => {
    setVisible(!visible);
  };

  const handleVisibleChange = (visible) => {
    setVisible(visible);
  };

  const onEditItemHandler = (id, ...args) => {
    onEditItem(id, ...args);
    setVisible(false);
  };

  return (
    <Popover
      content={<EditComponent id={id} onEdit={onEditItemHandler} {...editComponentProps} />}
      trigger="click"
      visible={visible}
      onVisibleChange={handleVisibleChange}
      placement="bottom"
      overlayClassName="edit-task-popover"
    >
      <button className='action' onClick={handleClick}>
        <BiPencil />
      </button>
    </Popover>
  );
}

ReusableEditButton.propTypes = {
  id: PropTypes.number.isRequired,
  EditComponent: PropTypes.elementType.isRequired,
  onEditItem: PropTypes.func.isRequired,
  editComponentProps: PropTypes.object,
};

ReusableEditButton.defaultProps = {
  editComponentProps: {},
};

export default ReusableEditButton;
