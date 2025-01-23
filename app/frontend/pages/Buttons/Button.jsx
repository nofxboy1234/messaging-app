import { Link } from '@inertiajs/react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

function Button({ className, text, onClick, type = 'button' }) {
  function handleClick(e) {
    console.log('handleClick');

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
  --bg-color: white;
  --fg-color: #bf4f74;

  background-color: var(--bg-color);
  color: var(--fg-color);
  font-size: 1rem;
  padding: 0.25rem 1rem;
  border: 2px solid var(--fg-color);
  border-radius: 3px;
  cursor: pointer;
  margin: 1rem;

  &:hover {
    background-color: var(--fg-color);
    color: var(--bg-color);
  }
`;

export default StyledButton;
