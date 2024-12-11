import { useForm } from '@inertiajs/react';
import PropTypes from 'prop-types';

function ProfileForm({ profile, onSubmit, submitText }) {
  const form = useForm({
    username: profile.username || '',
    about: profile.about || '',
  });
  const { data, setData, errors, processing } = form;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label style={{ display: 'block' }} htmlFor="username">
          Username
        </label>
        <input
          type="text"
          name="username"
          id="username"
          value={data.username}
          onChange={(e) => setData('username', e.target.value)}
        />
        {errors.username && (
          <div style={{ color: 'red' }}>{errors.username.join(', ')}</div>
        )}
      </div>
      <div>
        <label style={{ display: 'block' }} htmlFor="about">
          About
        </label>
        <textarea
          name="about"
          id="about"
          value={data.about}
          onChange={(e) => setData('about', e.target.value)}
        />
        {errors.about && (
          <div style={{ color: 'red' }}>{errors.about.join(', ')}</div>
        )}
      </div>
      <div>
        <button type="submit" disabled={processing}>
          {submitText}
        </button>
      </div>
    </form>
  );
}

ProfileForm.propTypes = {
  profile: PropTypes.object,
  onSubmit: PropTypes.func,
  submitText: PropTypes.string,
};

export default ProfileForm;
