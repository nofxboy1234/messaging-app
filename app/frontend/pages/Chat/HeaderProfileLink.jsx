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
  children: PropTypes.array,
  user: PropTypes.object,
  active: PropTypes.bool,
  scale: PropTypes.number,
};

const StyledHeaderProfileLink = styled(HeaderProfileLink)`
  --header-bg-color: rgb(0, 255, 200);

  background-color: var(--header-bg-color);

  &:hover {
    background-color: var(--header-bg-color);
  }
`;

export default StyledHeaderProfileLink;
