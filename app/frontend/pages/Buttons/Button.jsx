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
  --heliotrope: #ca7df9;
  --vivid-sky-blue: #49c6e5;
  --icterine: #f5f749;
  --white: white;
  --bright-pink-crayola: #ff5d73;

  --bg-color: black;
  --fg-color: #0280d5;

  background-color: var(--vivid-sky-blue);
  color: var(--bg-color);
  font-size: 1rem;
  padding: 0.25rem 1rem;
  border: 2px solid var(--vivid-sky-blue);
  border-radius: 3px;
  cursor: pointer;
  margin: 1rem;

  &:hover {
    background-color: white;
    border-color: black;
    color: var(--bg-color);
  }
`;

export default StyledButton;
