import styled from 'styled-components';
import { usePage, Link } from '@inertiajs/react';
import api from '../pathHelpers';
import PropTypes from 'prop-types';
import StyledLogoutButton from './sessions/Buttons/LogoutButton';
import { useState } from 'react';

const NavBar = ({ className }) => {
  const { shared } = usePage().props;
  const [activeMenuItemId, setActiveMenuItemId] = useState();

  const username = shared.current_user.email.split('@')[0];

  const menuItems = [
    { id: 0, text: 'Home', href: '/' },
    {
      id: 1,
      text: 'Friends',
      href: api.friendshipCategories.index.path(),
    },
    {
      id: 2,
      elementId: 'nav-bar-chats',
      text: 'Chats',
      href: api.chats.index.path(),
    },
    {
      id: 3,
      elementId: 'nav-bar-users',
      text: 'Users',
      href: api.users.index.path(),
    },
    {
      id: 4,
      text: `Profile (${username})`,
      href: api.profiles.show.path(shared.profile),
    },
  ];

  return (
    <div className={className}>
      <div id="link-container">
        {menuItems.map((menuItem) => (
          <Link
            key={menuItem.id}
            className="menu-item-container link"
            id={menuItem.elementId}
            href={menuItem.href}
            onClick={() => setActiveMenuItemId(menuItem.id)}
          >
            <div
              className={
                activeMenuItemId === menuItem.id
                  ? 'active-menu-item'
                  : undefined
              }
            >
              {menuItem.text}
            </div>
          </Link>
        ))}

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
  --bg-colour-active-menu-item: rgb(0, 255, 200);

  display: flex;
  justify-content: center;

  border: solid var(--border-color);
  border-width: 1px 0 1px;

  min-height: 50px;

  & #link-container {
    flex: 1 1 0;
    display: flex;
    flex-wrap: wrap;
  }

  & #link-container:last-child {
    border-right: 1px solid var(--border-color);
  }

  & .menu-item-container {
    flex: 1 1 0;
    display: flex;
    flex-direction: column;
    justify-content: center;

    border-left: 1px solid var(--border-color);

    min-height: 48px;

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
    background-color: var(--bg-color-hover);
  }

  & .active-menu-item {
    background-color: var(--bg-colour-active-menu-item);
  }
`;

export default StyledNavBar;
