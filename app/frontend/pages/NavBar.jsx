import styled from 'styled-components';
import { usePage, Link } from '@inertiajs/react';
import api from '../pathHelpers';
import PropTypes from 'prop-types';
import StyledLogoutButton from './sessions/Buttons/LogoutButton';

const NavBar = ({ className }) => {
  const { shared } = usePage().props;

  return (
    <div className={className}>
      <div id="link-container">
        <Link className="menu-item-container link" href="/">
          <div>Home</div>
        </Link>
        <Link
          className="menu-item-container link"
          href={api.friendshipCategories.index.path()}
        >
          <div>Friends</div>
        </Link>
        <Link
          className="menu-item-container link"
          id="nav-bar-chats"
          href={api.chats.index.path()}
        >
          <div>Chats</div>
        </Link>
        <Link
          className="menu-item-container link"
          id="nav-bar-users"
          href={api.users.index.path()}
        >
          <div>Users</div>
        </Link>
        <Link
          className="menu-item-container link"
          href={api.profiles.show.path(shared.profile)}
        >
          <div>Profile ({shared.current_user.email.split('@')[0]})</div>
        </Link>
        <div className="menu-item-container">
          <StyledLogoutButton session={shared.session} />
        </div>
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

  border: 1px solid var(--border-color);
  min-height: 50px;

  & #link-container {
    flex: 1 1 0;
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    max-width: 700px;
  }

  & .menu-item-container {
    flex: 1 1 0;
    display: flex;
    flex-direction: column;
    justify-content: center;

    > div {
      flex: 1 1 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }

  & .link {
    text-decoration: none;
  }

  & .link:link,
  .link:visited,
  .link:hover,
  .link:active {
    color: var(--medium-grey);
  }

  & .link:hover {
    background-color: #f7f7f7;
  }
`;

export default StyledNavBar;
