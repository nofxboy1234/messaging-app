import { Link, usePage } from '@inertiajs/react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

function UserLink({ className, children, targetPath }) {
  const pageUrl = usePage().url;

  return (
    <div className={className} data-testid={`user-link-${targetPath}`}>
      <Link
        className="link"
        href={targetPath}
        onClick={(event) => {
          if (targetPath === pageUrl) {
            event.preventDefault();
          }
        }}
      >
        {children}
      </Link>
    </div>
  );
}

UserLink.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
  targetPath: PropTypes.string,
  active: PropTypes.bool,
};

const StyledUserLink = styled(UserLink)`
  & .link {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem 3rem;
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
