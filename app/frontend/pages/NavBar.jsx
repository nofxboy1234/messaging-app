import styled from 'styled-components';

import { usePage, Link } from '@inertiajs/react';
import api from '../pathHelpers';
import PropTypes from 'prop-types';
import StyledLogoutButton from './sessions/Buttons/LogoutButton';

const NavBar = ({ className }) => {
  const { shared } = usePage().props;

  return (
    <div className={className}>
      <Link href="/">Home</Link>
      <Link href={api.friendshipCategories.index.path()}>Friends</Link>
      <Link id="nav-bar-chats" href={api.chats.index.path()}>
        Chats
      </Link>
      <Link id="nav-bar-users" href={api.users.index.path()}>
        Users
      </Link>
      <Link href={api.profiles.show.path(shared.profile)}>
        Profile ({shared.current_user.email.split('@')[0]})
      </Link>
      <StyledLogoutButton session={shared.session} />
    </div>
  );
};

NavBar.propTypes = {
  className: PropTypes.string,
};

const StyledNavBar = styled(NavBar)`
  display: flex;
  justify-content: center;
  column-gap: 1rem;
  flex-wrap: wrap;
`;

export default StyledNavBar;
