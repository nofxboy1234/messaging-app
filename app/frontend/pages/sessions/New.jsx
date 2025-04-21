import { useEffect, useState } from 'react';
import LoginButton from './Buttons/LoginButton';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import fontUrl from '/assets/fonts/jetbrains_mono/static/JetBrainsMono-Regular.ttf';
import SignupButton from './Buttons/SignupButton';
import { router, usePage } from '@inertiajs/react';

function SessionsNew({ className }) {
  const [values, setValues] = useState({
    email: '',
    password: '',
  });
  const [serverError, setServerError] = useState(null);
  const { shared } = usePage().props;

  function handleChange(e) {
    const key = e.target.id;
    const value = e.target.value;
    setValues((values) => ({
      ...values,
      [key]: value,
    }));
  }

  useEffect(() => {
    return router.on('invalid', (event) => {
      event.preventDefault();
      setServerError(event.detail.response.data);
    });
  }, []);

  return (
    <div className={className} data-testid="sessions-new">
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

      {serverError &&
        serverError != 'You need to sign in or sign up before continuing.' && (
          <div className="error">{serverError}</div>
        )}
      {Object.entries(shared.flash).map(([key, value]) => (
        <div className="error" key={key}>
          {value}
        </div>
      ))}
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
    background-color: var(--bg-flash-message);
    color: var(--fg-flash-message);
  }
`;

export default StyledSessionsNew;
