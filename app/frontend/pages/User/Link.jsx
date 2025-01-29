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
    align-items: center;
    gap: 3rem;
    text-decoration: none;
    padding: 0.3rem 1rem;
  }

  & .link:link {
    color: var(--medium-grey);
  }

  & .link:visited {
    color: var(--medium-grey);
  }

  & .link:hover {
    color: var(--medium-grey);
  }

  & .link:active {
    color: var(--medium-grey);
  }
`;

export default StyledUserLink;
