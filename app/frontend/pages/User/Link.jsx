import { Link } from '@inertiajs/react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

function UserLink({ className, children, targetPath, active = true }) {
  return (
    <div id="UserLink" className={className}>
      {active ? (
        <Link className="children" href={targetPath}>
          {children}
        </Link>
      ) : (
        <div className="children">{children}</div>
      )}
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

    transition: padding 2s ease-out 0s;
  }

  ${(props) =>
    props.active &&
    css`
      & .children {
        padding: 3rem 0;
      }
    `}
`;

export default StyledUserLink;
