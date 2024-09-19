import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Row, Col, Typography, Form, Input, Button } from 'antd';
import LoginInput from '../components/User/LoginInput';
import { login } from '../utils/crud_api';
import LocaleContext from '../contexts/LocaleContext';

const { Title, Text } = Typography;

function LoginPage({ loginSuccess }) {
  const { locale } = React.useContext(LocaleContext);

  async function onLogin({ email, password }) {
    const { error, data } = await login({ email, password });

    if (!error) {
      loginSuccess(data);
      console.log(data);
    }
  }

  return (
    <Row className="login-page" align="middle">
      <Col xs={24} md={12} className="login-form-container">
        <Title level={2} className="login-title">
          {locale === 'id' ? 'Yuk, login untuk menggunakan dasbor.' : 'Login to use the dashboard'}
        </Title>
        <LoginInput login={onLogin} />
      </Col>
      <Col xs={0} md={12} className="login-image-container">
        <img src="/src/assets/login-page-image.png" alt="Robot" className="login-image" />
      </Col>
    </Row>
  );
}

LoginPage.propTypes = {
  loginSuccess: PropTypes.func.isRequired,
};

export default LoginPage;
