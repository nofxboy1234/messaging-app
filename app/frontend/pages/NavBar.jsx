import styled from 'styled-components';
import { usePage, Link } from '@inertiajs/react';
import api from '../pathHelpers';
import PropTypes from 'prop-types';
import StyledLogoutButton from './sessions/Buttons/LogoutButton';

const NavBar = ({ className }) => {
  const { shared } = usePage().props;

  return (
    <div className={className}>
      <Link className="menu-item-container" href="/">
        <div>Home</div>
      </Link>
      <Link
        className="menu-item-container"
        href={api.friendshipCategories.index.path()}
      >
        <div>Friends</div>
      </Link>
      <Link
        className="menu-item-container"
        id="nav-bar-chats"
        href={api.chats.index.path()}
      >
        <div>Chats</div>
      </Link>
      <Link
        className="menu-item-container"
        id="nav-bar-users"
        href={api.users.index.path()}
      >
        <div>Users</div>
      </Link>
      <Link
        className="menu-item-container"
        href={api.profiles.show.path(shared.profile)}
      >
        <div>Profile ({shared.current_user.email.split('@')[0]})</div>
      </Link>
      <div className="menu-item-container">
        <StyledLogoutButton session={shared.session} />
      </div>
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
  min-height: 50px;

  & .menu-item-container {
    display: flex;
    flex-direction: column;
    justify-content: center;

    > div {
      flex: 1 1 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }
`;

export default StyledNavBar;
