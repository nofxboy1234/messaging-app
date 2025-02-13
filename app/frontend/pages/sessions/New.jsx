import { useEffect, useState } from 'react';
import LoginButton from './Buttons/LoginButton';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import fontUrl from '/assets/fonts/jetbrains_mono/static/JetBrainsMono-Regular.ttf';
import SignupButton from './Buttons/SignupButton';
import { router } from '@inertiajs/react';

function SessionsNew({ className }) {
  const [values, setValues] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  function handleChange(e) {
    const key = e.target.id;
    const value = e.target.value;
    setValues((values) => ({
      ...values,
      [key]: value,
    }));
  }

  useEffect(() => {
    const removeInvalidEventListener = router.on('invalid', (event) => {
      if (event.detail.response.statusText != 'OK') {
        event.preventDefault();
        setError(event.detail.response.data);
      }
    });

    return () => {
      removeInvalidEventListener();
    };
  }, []);

  return (
    <div className={className}>
      <div id="content-container">
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

          <div id="new-session-buttons">
            <LoginButton data={values} />
            <SignupButton />
          </div>
        </form>
      </div>
      <div className="error">{error}</div>
    </div>
  );
}

SessionsNew.propTypes = {
  className: PropTypes.string,
};

const StyledSessionsNew = styled(SessionsNew)`
  height: 100vh;
  display: flex;
  flex-direction: column;
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
    padding: 1rem;

    overflow-x: hidden;
    overflow-y: auto;
  }

  & #content-container {
    overflow-x: hidden;
    overflow-y: auto;
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

  & #new-session-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-top: 1rem;
    overflow-x: hidden;
    overflow-y: auto;
  }

  & .error {
    color: red;
  }
`;

export default StyledSessionsNew;
