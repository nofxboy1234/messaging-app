import { Link } from '@inertiajs/react';
import { useState } from 'react';
import api from '../../pathHelpers';
import StyledLoginButton from './Buttons/LoginButton';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import styles from '../Layout.module.css';
import fontUrl from '/assets/fonts/jetbrains_mono/static/JetBrainsMono-Regular.ttf';

function SessionsNew({ className }) {
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  function handleChange(e) {
    const key = e.target.id;
    const value = e.target.value;
    setValues((values) => ({
      ...values,
      [key]: value,
    }));
  }

  return (
    <div className={className}>
      <form>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={values.email}
          onChange={handleChange}
          autoFocus
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={values.password}
          onChange={handleChange}
        />
        {/* <label htmlFor="remember_me">Remember me:</label> */}

        <div>
          <StyledLoginButton data={values} />
          <Link href={api.registrations.new.path()}>Sign up</Link>
        </div>
      </form>
    </div>
  );
}

SessionsNew.propTypes = {
  className: PropTypes.string,
};

const StyledSessionsNew = styled(SessionsNew)`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  @font-face {
    font-family: 'JetbrainsMono';
    src: url(${fontUrl});
  }

  font-family: 'JetbrainsMono', monospace;

  form {
    display: flex;
    flex-direction: column;

    border: 1px solid var(--border-color);
    padding: 3rem;
  }
`;

export default StyledSessionsNew;
