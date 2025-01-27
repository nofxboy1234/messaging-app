import PropTypes from 'prop-types';
import styled from 'styled-components';
import EditProfileButton from './Buttons/EditProfileButton';
import UpdateAvatarLink from './Buttons/UpdateAvatarLink';

function ProfileActions({ className, profile }) {
  return (
    <div className={className}>
      <EditProfileButton profile={profile} />
      <UpdateAvatarLink />
    </div>
  );
}

ProfileActions.propTypes = {
  className: PropTypes.string,
  profile: PropTypes.object,
};

const StyledProfileActions = styled(ProfileActions)`
  --heliotrope: #ca7df9;
  --vivid-sky-blue: #49c6e5;
  --icterine: #f5f749;
  --timberwolf: #dbd4d3;
  --bright-pink-crayola: #ff5d73;

  display: flex;
  border: 1px solid black;
  background-color: var(--bright-pink-crayola);
  padding: 0.5rem;
`;

export default StyledProfileActions;
