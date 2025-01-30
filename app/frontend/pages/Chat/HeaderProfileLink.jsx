import PropTypes from 'prop-types';
import styled from 'styled-components';
import ProfileLink from '../Profile/Link';

function HeaderProfileLink({ className, children, user, active, scale = 0.7 }) {
  return (
    <ProfileLink
      className={className}
      user={user}
      active={active}
      scale={scale}
    >
      {children}
    </ProfileLink>
  );
}

HeaderProfileLink.propTypes = {
  className: PropTypes.string,
  children: PropTypes.object,
  user: PropTypes.object,
  active: PropTypes.bool,
};

const StyledHeaderProfileLink = styled(HeaderProfileLink)`
  --header-bg-color: #fafafa;

  background-color: var(--header-bg-color);

  &:hover {
    background-color: var(--header-bg-color);
  }
`;

export default StyledHeaderProfileLink;
