import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

function ForgetPasswordInput({ onForget }) {
  const [email, setEmail] = React.useState('');
  const [currentPassword, setCurrentPassword] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');
  const navigate = useNavigate();

  function onEmailChangeHandler(event) {
    setEmail(event.target.value);
  }

  function onCurrentPasswordChangeHandler(event) {
    setCurrentPassword(event.target.value);
  }

  function onNewPasswordChangeHandler(event) {
    setNewPassword(event.target.value);
  }

  async function onSubmitHandler(event) {
    event.preventDefault();

    try {
      await onForget({
        email: email,
        current_password: currentPassword,
        new_password: newPassword,
      });
    } catch (err) {
      console.error('Error submitting form:', err);
    }
  }

  function onCancelHandler(event) {
    event.preventDefault();
    navigate('/login'); // Redirect to login page
  }

  return (
    <form onSubmit={onSubmitHandler} className='input-login'>
      <label>Email</label>
      <input type="email" placeholder='Email' value={email} onChange={onEmailChangeHandler} />
      <label>Current Password</label>
      <input type="password" placeholder='Current Password' value={currentPassword} onChange={onCurrentPasswordChangeHandler} />
      <label>New Password</label>
      <input type="password" placeholder='New Password' value={newPassword} onChange={onNewPasswordChangeHandler} />
      <button type="button" onClick={onCancelHandler}>Cancel</button>
      <button type="submit">Change Password</button>
    </form>
  );
}

ForgetPasswordInput.propTypes = {
  onForget: PropTypes.func.isRequired,
};

export default ForgetPasswordInput;
