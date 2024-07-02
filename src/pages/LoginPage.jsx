import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import LoginInput from '../components/User/LoginInput';
import { login } from '../utils/crud_api';
import LocaleContext from '../contexts/LocaleContext';
 
function LoginPage({ loginSuccess }) {
  const {locale} = React.useContext(LocaleContext);
    async function onLogin({ email, password }) {
      const { error, data } = await login({ email, password });
  
      if (!error) {
        loginSuccess(data);
        console.log(data);
      }
    }

 
  return (
    <section className='login-page'>
      <h2>{locale==='id' ? 'Yuk, login untuk menggunakan dasbor.' : 'Login to use dashboard, please'}</h2>
      <LoginInput login={onLogin} />
      <p>{locale==='id' ? 'Lupa password?' : 'Forget the password?'} <Link to="/forgetPass">{locale==='id' ? 'to Forget Password Page' : 'ke Halaman Lupa Password'}</Link></p>
    </section>
  );
}
 
LoginPage.propTypes = {
  loginSuccess: PropTypes.func.isRequired,
}
 
export default LoginPage;