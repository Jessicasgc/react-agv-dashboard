import PropTypes from 'prop-types';
import { BiTrashAlt } from 'react-icons/bi';

function DeleteItemButton({ id, onDelete }) {
  return (
    <button
      className='action'
      onClick={() => onDelete(id)}>
      <BiTrashAlt/>
    </button>
  );
}

DeleteItemButton.propTypes = {
  id: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
}

export default DeleteItemButton;