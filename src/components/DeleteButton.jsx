import PropTypes from 'prop-types';
import { BiTrashAlt } from 'react-icons/bi';

function DeleteButton({ id, onDelete }) {
  return (
    <button
      className='action'
      onClick={() => onDelete(id)}>
      <BiTrashAlt/>
    </button>
  );
}

DeleteButton.propTypes = {
  id: PropTypes.number.isRequired,
  onDelete: PropTypes.func.isRequired,
}

export default DeleteButton;