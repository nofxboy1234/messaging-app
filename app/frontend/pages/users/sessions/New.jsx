import { router } from '@inertiajs/react';
import { useState } from 'react';

function New() {
  const [values, setValues] = useState({
    email: '',
    password: '',
    remember_me: false,
  });

  function handleChange(e) {
    const key = e.target.id;
    const value = e.target.value;
    setValues((values) => ({
      ...values,
      [key]: value,
    }));
  }

  function handleCheckboxChange(e) {
    const key = e.target.id;
    const value = values.remember_me;
    setValues((values) => ({
      ...values,
      [key]: !value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const userData = {
      user: {
        email: values.email,
        password: values.password,
        remember_me: values.remember_me,
      },
    };
    router.post('/users/sign_in', userData);
  }

  return (
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
      <input
        type="checkbox"
        id="remember_me"
        value={values.remember_me}
        onChange={handleCheckboxChange}
      />

      <button type="submit">Log in</button>
    </form>
  );
}

export default New;
