import React from 'react';
import ForgetPasswordInput from '../components/User/ForgetPasswordInput'
// import { changePasswordBeforeLogin } from '../utils/crud_api';
import LocaleContext from '../contexts/LocaleContext';
import { useNavigate } from 'react-router-dom';
function ForgetPasswordPage() {
  const {locale} = React.useContext(LocaleContext);
  const navigate = useNavigate();
 
  async function onForget({ email, current_password, new_password }) {
    // const { error } = await changePasswordBeforeLogin({email, current_password, new_password})
    // if (!error) {
    //   navigate('/');
    // }
  }
 
  return (
    <section className='login-page'>
      <h2>{locale==='id' ? 'Jika lupa password, anda dapat mengubahnya di sini' : 'If you forget the password, you can change your password here'}</h2>
      <ForgetPasswordInput onForget={onForget} />
    </section>
  );
}

 
export default ForgetPasswordPage;