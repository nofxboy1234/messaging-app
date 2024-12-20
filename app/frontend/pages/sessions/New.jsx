import { Link } from '@inertiajs/react';
import { useState } from 'react';
import api from '../../pathHelpers';

function SessionsNew() {
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

  function handleSubmit(e) {
    e.preventDefault();
    api.sessions.create({ data: values });
    // router.post('/sign_in', values);
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
        <label htmlFor="remember_me">Remember me:</label>

        <button type="submit">Log in</button>
      </form>

      <Link href={api.registrations.new.path()}>Sign up</Link>
    </>
  );
}

export default SessionsNew;
