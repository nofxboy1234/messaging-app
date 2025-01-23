import { useForm } from '@inertiajs/react';
import PropTypes from 'prop-types';
import UpdateProfileButton from './Buttons/UpdateProfileButton';
import ShowProfileButton from './Buttons/ShowProfileButton';

function ProfileForm({ profile, onSubmit, submitText }) {
  const form = useForm({
    username: profile.username || '',
    about: profile.about || '',
  });
  const { data, setData, errors, processing } = form;

  return (
    <form>
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
        <UpdateProfileButton onSubmit={onSubmit} form={form} />
        <ShowProfileButton profile={profile} />
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
