import { useState } from 'react';
import api from '../../pathHelpers';

function RegistrationsNew() {
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

  function handleSubmit(e) {
    e.preventDefault();
    api.registrations.create({ data: values });
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={values.email}
          onChange={handleChange}
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

        <button type="submit">Sign up</button>
      </form>
    </>
  );
}

export default RegistrationsNew;
