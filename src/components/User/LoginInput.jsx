import React from 'react';
import PropTypes from 'prop-types';

 
function LoginInput({login}) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  
 
  function onEmailChangeHandler(event) {
    setEmail(event.target.value);
  }
 
  function onPasswordChangeHandler(event) {
    setPassword(event.target.value);
  }
 
  async function onSubmitHandler(event) {
    event.preventDefault();
 
    await login({
      email: email,
      password: password,
    });
    // console.log(this.state.authedUser);
  }
 
  return (
    <form onSubmit={onSubmitHandler} className='input-login'>
      <label>Email</label>
      <input type="email" placeholder='Email' value={email} onChange={onEmailChangeHandler} />
      <label>Password</label>
      <input type="password" placeholder='Password' value={password} onChange={onPasswordChangeHandler} />
      <button>Login</button>
    </form>
  );
}
 
LoginInput.propTypes = {
  login: PropTypes.func.isRequired,
}
 
export default LoginInput;