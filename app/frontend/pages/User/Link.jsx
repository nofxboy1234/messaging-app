import { Link } from '@inertiajs/react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

function UserLink({ className, children, targetPath, active = true }) {
  return active ? (
    <Link className={className} href={targetPath}>
      {children}
    </Link>
  ) : (
    <div className={className}>{children}</div>
  );
}

UserLink.propTypes = {
  className: PropTypes.string,
  children: PropTypes.array,
  targetPath: PropTypes.string,
  active: PropTypes.bool,
};

const StyledUserLink = styled(UserLink)`
  display: flex;
  justify-content: space-between;

  background-color: inherit;
  border-radius: 5px;
  text-decoration: none;

  &:hover {
    cursor: pointer;
    background-color: white;
  }
`;

export default StyledUserLink;
