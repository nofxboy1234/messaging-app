import { useState } from 'react';
import LoginButton from './Buttons/LoginButton';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import styles from '../Layout.module.css';
import fontUrl from '/assets/fonts/jetbrains_mono/static/JetBrainsMono-Regular.ttf';
import SignupButton from './Buttons/SignupButton';

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
      <div>
        <div id="header">Log in</div>
        <form>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={values.email}
            onChange={handleChange}
            autoFocus
          />
          <label id="password-label" htmlFor="password">
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={values.password}
            onChange={handleChange}
          />

          <div>
            <LoginButton data={values} />
            <SignupButton />
          </div>
        </form>
      </div>
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

  input {
    font-family: 'JetbrainsMono', monospace;
    font-size: 1rem;

    border: 1px solid #e4e4e4;
    color: var(--medium-grey);

    padding: 0.5rem 0.8rem;
  }

  & #header {
    text-align: center;
    font-size: 2rem;
  }

  & #password-label {
    margin-top: 1rem;
  }
`;

export default StyledSessionsNew;
