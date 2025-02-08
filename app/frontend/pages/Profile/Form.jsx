import { useForm } from '@inertiajs/react';
import PropTypes from 'prop-types';
import UpdateProfileButton from './Buttons/UpdateProfileButton';
import ShowProfileButton from './Buttons/ShowProfileButton';
import Picture from './Picture';
import styled from 'styled-components';

function ProfileForm({ className, profile, onSubmit }) {
  const form = useForm({
    username: profile.username || '',
    about: profile.about || '',
  });
  const { data, setData, errors, processing } = form;

  return (
    <form className={className} id="profile-form-container">
      <div>
        <Picture className="profile-data" src={profile.picture} scale={2} />
        <div>
          <div id="username-container">
            <input
              type="text"
              name="username"
              id="username"
              value={data.username}
              onChange={(e) => setData('username', e.target.value)}
            />
          </div>
          {errors.username && (
            <div style={{ color: 'red' }}>{errors.username.join(', ')}</div>
          )}
        </div>
        <div id="about-me-label">
          <label style={{ display: 'block' }} htmlFor="about">
            About Me:
          </label>
          <div id="about-container">
            <textarea
              name="about"
              id="about"
              value={data.about}
              onChange={(e) => setData('about', e.target.value)}
            />
          </div>
          {errors.about && (
            <div style={{ color: 'red' }}>{errors.about.join(', ')}</div>
          )}
        </div>
      </div>
      <div id="edit-buttons">
        <UpdateProfileButton onSubmit={onSubmit} form={form} />
        <ShowProfileButton profile={profile} />
      </div>
    </form>
  );
}

ProfileForm.propTypes = {
  className: PropTypes.string,
  profile: PropTypes.object,
  onSubmit: PropTypes.func,
};

const StyledProfileForm = styled(ProfileForm)`
  flex: 1 1 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid var(--border-color);
  border-radius: 5px;
  padding: 1rem;

  input,
  textarea {
    flex: 1 1 0;

    font-family: 'JetbrainsMono', monospace;
    font-size: 1rem;

    border: 1px solid #e4e4e4;
    color: var(--medium-grey);

    padding: 0.5rem 0.8rem;
    width: 0;
  }

  & #username-container {
    display: flex;
  }

  & #username {
    flex: 1 1 0;
  }

  & #about-me-label {
    margin-top: 1rem;
  }

  & #about-container {
    display: flex;
  }

  & #about {
    flex: 1 1 0;
    display: flex;

    border-radius: 8px;
    min-height: 63px;
    overflow-wrap: anywhere;
  }

  & #edit-buttons {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    margin-top: 1rem;
  }
`;

export default StyledProfileForm;
