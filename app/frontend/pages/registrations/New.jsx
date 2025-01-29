import { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import styles from '../Layout.module.css';
import fontUrl from '/assets/fonts/jetbrains_mono/static/JetBrainsMono-Regular.ttf';
import SignupButton from './Buttons/SignupButton';
import StyledBackButton from './Buttons/BackButton';

function RegistrationsNew({ className }) {
  const [values, setValues] = useState({
    email: '',
    password: '',
    password_confirmation: '',
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
        <label htmlFor="password_confirmation">Password confirmation:</label>
        <input
          type="password"
          id="password_confirmation"
          value={values.password_confirmation}
          onChange={handleChange}
        />

        <div>
          <SignupButton values={values} />
          <StyledBackButton />
        </div>
      </form>
    </div>
  );
}

RegistrationsNew.propTypes = {
  className: PropTypes.string,
};

const StyledRegistrationsNew = styled(RegistrationsNew)`
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
`;

export default StyledRegistrationsNew;
