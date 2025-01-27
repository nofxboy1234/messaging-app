import { Link } from '@inertiajs/react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

function UserLink({ className, children, targetPath }) {
  return (
    <div id="UserLink" className={className}>
      <Link className="link" href={targetPath}>
        {children}
      </Link>
    </div>
  );
}

UserLink.propTypes = {
  className: PropTypes.string,
  children: PropTypes.array,
  targetPath: PropTypes.string,
  active: PropTypes.bool,
};

const StyledUserLink = styled(UserLink)`
  & .link {
    display: flex;
    justify-content: space-between;
    text-decoration: none;
  }

  & .link:link {
    color: black;
  }

  & .link:visited {
    color: black;
  }

  & .link:hover {
    color: white;
  }

  & .link:active {
    color: white;
  }
`;

export default StyledUserLink;
