import styled from 'styled-components';

import { usePage, Link } from '@inertiajs/react';
import api from '../pathHelpers';
import PropTypes from 'prop-types';

const NavBar = ({ className }) => {
  const { shared } = usePage().props;

  return (
    <div className={className}>
      <div>
        <Link href="/">Home</Link>
      </div>
      <div>
        <Link href={api.friendshipCategories.index.path()}>Friends</Link>
      </div>
      <div id="nav-bar-chats">
        <Link href={api.chats.index.path()}>Chats</Link>
      </div>
      <div id="nav-bar-users">Users</div>
      <div>
        <Link href={api.profiles.show.path(shared.profile)}>
          Profile ({shared.current_user.email.split('@')[0]})
        </Link>
      </div>
      <div>
        <Link
          href={api.sessions.destroy.path(shared.session)}
          as="button"
          type="button"
          method="delete"
        >
          Log out
        </Link>
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
`;

export default StyledNavBar;
