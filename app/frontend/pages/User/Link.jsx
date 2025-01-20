import { Link } from '@inertiajs/react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

function UserLink({ className, children, targetPath, handleClick, active }) {
  return active ? (
    <Link className={className} href={targetPath} onClick={handleClick}>
      {children}
    </Link>
  ) : (
    <div className={className}>{children}</div>
  );
}

UserLink.propTypes = {
  handleClick: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.array,
  targetPath: PropTypes.string,
};

const StyledUserLink = styled(UserLink)`
  display: flex;
  justify-content: space-between;

  background-color: #a07eff;
  border: 1px solid black;
  border-radius: 5px;
  padding: 0.3rem;
  text-decoration: none;

  &:hover {
    cursor: pointer;
  }
`;

export default StyledUserLink;
