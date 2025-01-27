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
  --heliotrope: #ca7df9;
  --vivid-sky-blue: #49c6e5;
  --icterine: #f5f749;
  --white: white;
  --bright-pink-crayola: #ff5d73;

  background-color: var(--vivid-sky-blue);
  color: var(--fg-color);
  font-size: 1rem;
  padding: 0.25rem 1rem;
  border: 2px solid var(--fg-color);
  border-radius: 3px;
  cursor: pointer;
  margin: 1rem;
  text-decoration: none;
  font-family: Arial, Helvetica, sans-serif;

  &:hover {
    background-color: white;
    color: black;
  }
`;

export default StyledUpdateAvatarLink;
