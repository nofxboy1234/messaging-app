import { useEffect, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import fontUrl from '/assets/fonts/jetbrains_mono/static/JetBrainsMono-Regular.ttf';
import SignupButton from './Buttons/SignupButton';
import StyledBackButton from './Buttons/BackButton';
import { router, usePage } from '@inertiajs/react';

function RegistrationsNew({ className }) {
  const [values, setValues] = useState({
    email: '',
    password: '',
    password_confirmation: '',
  });
  const [error, setError] = useState('');
  const { shared, errors } = usePage().props;

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
        console.log(event);
        // setError(event.detail.response.data);
      }
    });

    return () => {
      removeInvalidEventListener();
    };
  }, []);

  return (
    <div className={className}>
      <div id="content-container">
        <div id="header">Sign up</div>
        <form>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={values.email}
            onChange={handleChange}
            autoFocus
          />
          {errors?.email && <div>{errors.email}</div>}
          <label id="password-label" htmlFor="password">
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={values.password}
            onChange={handleChange}
          />
          {errors?.password && <div>{errors.password}</div>}
          <label
            id="password-confirmation-label"
            htmlFor="password_confirmation"
          >
            Password confirmation:
          </label>
          <input
            type="password"
            id="password_confirmation"
            value={values.password_confirmation}
            onChange={handleChange}
          />
          {errors?.password_confirmation && (
            <div>{errors.password_confirmation}</div>
          )}

          <div id="new-registration-buttons">
            <SignupButton values={values} />
            <StyledBackButton />
          </div>
        </form>
      </div>

      <div className="error">{error}</div>
      {Object.entries(shared.flash).map(([key, value]) => (
        <div className="error" key={key}>
          {value}
        </div>
      ))}
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

  & #password-label,
  #password-confirmation-label {
    margin-top: 1rem;
  }

  & #new-registration-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-top: 1rem;
    overflow-x: hidden;
    overflow-y: auto;
  }
`;

export default StyledRegistrationsNew;
