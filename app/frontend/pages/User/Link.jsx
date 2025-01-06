import { Link } from '@inertiajs/react';
import PropTypes from 'prop-types';

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

export default UserLink;
