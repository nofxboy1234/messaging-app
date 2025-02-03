import styled from 'styled-components';
import PropTypes from 'prop-types';

function UpdateAvatarLink({ className }) {
  return (
    <a
      className={className}
      href="https://gravatar.com/connect/?gravatar_from=signup"
      target="_blank"
    >
      Update avatar
    </a>
  );
}

UpdateAvatarLink.propTypes = {
  className: PropTypes.string,
  profile: PropTypes.object,
};

const StyledUpdateAvatarLink = styled(UpdateAvatarLink)`
  background-color: var(--vivid-sky-blue);
  color: var(--bg-grey);
  font-size: 1rem;
  padding: 0.25rem 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 0;
  text-decoration: none;

  &:hover {
    background-color: var(--vivid-sky-blue-hover);
  }
`;

export default StyledUpdateAvatarLink;
