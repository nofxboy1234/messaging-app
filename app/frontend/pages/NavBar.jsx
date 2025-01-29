import styled from 'styled-components';

import { usePage, Link } from '@inertiajs/react';
import api from '../pathHelpers';
import PropTypes from 'prop-types';
import StyledLogoutButton from './sessions/Buttons/LogoutButton';

const NavBar = ({ className }) => {
  const { shared } = usePage().props;

  return (
    <div className={className}>
      <Link href="/">
        <div>Home</div>
      </Link>
      <Link href={api.friendshipCategories.index.path()}>
        <div>Friends</div>
      </Link>
      <Link id="nav-bar-chats" href={api.chats.index.path()}>
        <div>Chats</div>
      </Link>
      <Link id="nav-bar-users" href={api.users.index.path()}>
        <div>Users</div>
      </Link>
      <Link href={api.profiles.show.path(shared.profile)}>
        <div>Profile ({shared.current_user.email.split('@')[0]})</div>
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

  border: 1px solid var(--border-color);
`;

export default StyledNavBar;
