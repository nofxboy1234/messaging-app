import PropTypes from 'prop-types';
import styled from 'styled-components';
import ProfileLink from '../Profile/Link';

function HeaderProfileLink({ className, children, user, active }) {
  return (
    <ProfileLink className={className} user={user} active={active}>
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
  background-color: var(--bg-color-hover);

  &:hover {
    background-color: var(--bg-color-hover);
  }
`;

export default StyledHeaderProfileLink;
