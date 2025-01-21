import { Link } from '@inertiajs/react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

function UserLink({ className, children, targetPath, active = true }) {
  return (
    <div id="UserLink" className={className}>
      <Link className="children" href={targetPath}>
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
  & .children {
    display: flex;
    justify-content: space-between;
    text-decoration: none;
    pointer-events: none;

    transition: padding 2s ease-out 0s;
  }

  ${(props) =>
    props.active &&
    css`
      & .children {
        pointer-events: auto;
        padding: 3rem 0;
      }
    `}
`;

export default StyledUserLink;
