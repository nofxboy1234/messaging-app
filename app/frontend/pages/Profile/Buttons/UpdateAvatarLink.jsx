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
  color: var(--medium-grey);
  font-size: 1rem;
  padding: 0.25rem 1rem;
  border: 2px solid var(--vivid-sky-blue);
  cursor: pointer;
  margin: 1rem;
  text-decoration: none;

  &:hover {
    background-color: white;
    border-color: black;
    color: var(--medium-grey);
  }
`;

export default StyledUpdateAvatarLink;
