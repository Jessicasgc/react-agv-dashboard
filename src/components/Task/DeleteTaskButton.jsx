import PropTypes from 'prop-types';
import { BiTrashAlt } from 'react-icons/bi';

function DeleteTaskButton({ id, onDelete }) {
  console.log('onDelete prop:', onDelete);
  console.log('typeof onDelete:', typeof onDelete);
  return (
    <button
      className='action'
      onClick={() => onDelete(id)}>
      <BiTrashAlt/>
    </button>
  );
}

DeleteTaskButton.propTypes = {
  id: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
}

export default DeleteTaskButton;