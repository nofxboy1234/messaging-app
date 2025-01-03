import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from '@inertiajs/react';
import api from '../../pathHelpers';

function ProfileActions({ className, profile }) {
  return (
    <div className={className}>
      <Link href={api.profiles.edit.path(profile)}>Edit this profile</Link>
      <div>
        <a
          href="https://gravatar.com/connect/?gravatar_from=signup"
          target="_blank"
        >
          Update avatar
        </a>
      </div>
    </div>
  );
}

ProfileActions.propTypes = {
  className: PropTypes.string,
  profile: PropTypes.object,
};

const StyledProfileActions = styled(ProfileActions)`
  border: 1px solid black;
  background-color: #6cfaff;
  padding: 0.5rem;
`;

export default StyledProfileActions;
