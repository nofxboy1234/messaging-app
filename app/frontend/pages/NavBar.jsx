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
        {' | '}
        Friends
        {' | '}
        <Link href={api.friendships.index.path()}>All</Link>
        {' | '}
        <Link href={api.friendRequests.index.path()}>Pending</Link>
      </div>
      <div>
        <Link href={api.profiles.show.path(shared.profile)}>
          Profile ({shared.current_user.email.split('@')[0]})
        </Link>
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
  justify-content: space-between;
  background-color: #79ffe2;
`;

export default StyledNavBar;
