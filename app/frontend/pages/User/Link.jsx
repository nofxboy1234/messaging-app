import { Link } from '@inertiajs/react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

function UserLink({ className, children, targetPath }) {
  return (
    <Link className={className} href={targetPath}>
      {children}
    </Link>
  );
}

UserLink.propTypes = {
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
  &:hover {
    background-color: white;
    cursor: pointer;
  }
  text-decoration: none;
`;

export default StyledUserLink;
