import { Link } from '@inertiajs/react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

function Button({ className, text, onClick, type = 'button' }) {
  function handleClick(e) {
    e.preventDefault();
    onClick();
  }

  return (
    <Link className={className} as="button" type={type} onClick={handleClick}>
      {text}
    </Link>
  );
}

Button.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.string,
};

const StyledButton = styled(Button)`
  font-family: 'OverpassMono', monospace;
  font-size: 1rem;

  background-color: var(--vivid-sky-blue);
  color: var(--bg-grey);
  padding: 0.25rem 1rem;
  border: none;
  cursor: pointer;
  margin: 1rem;

  &:hover {
    background-color: var(--vivid-sky-blue-hover);
  }
`;

export default StyledButton;
