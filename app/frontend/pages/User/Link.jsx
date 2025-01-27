import { Link } from '@inertiajs/react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

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

const StyledUserLink = styled(UserLink).attrs((props) => ({
  $active: props.$active === undefined ? true : props.$active,
}))`
  & .link {
    display: flex;
    justify-content: space-between;
    text-decoration: none;
    pointer-events: none;

    transition: padding 0.1s ease-out 0s;
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
    color: black;
  }

  ${(props) => {
    return (
      props.$active &&
      css`
        & .link {
          pointer-events: auto;
          ${(props) => props.$activePadding && 'padding: 3rem 0'}
        }
      `
    );
  }}
`;

export default StyledUserLink;
