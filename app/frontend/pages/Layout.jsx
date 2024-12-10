import { useState, createContext } from 'react';
import { usePage, Link } from '@inertiajs/react';
import styled from 'styled-components';

import api from '../pathHelpers';

import ChatIndex from './Chat/Index';
import UserIndex from './User/Index';
import PropTypes from 'prop-types';

export const LayoutContext = createContext({
  setChats: () => {},
  setUsers: () => {},
});

const Layout = ({ className, children }) => {
  const { shared } = usePage().props;

  const initialChats = shared.chats;
  const initialUsers = shared.users;

  const [chats, setChats] = useState(initialChats);
  const [users, setUsers] = useState(initialUsers);

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
        {' | '}
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

      <br></br>

      <div className="container">
        <div className={'chats'}>
          <ChatIndex initialChats={chats} />
          <div>
            <input type="text" />
          </div>
        </div>

        <div className={'content'}>
          <LayoutContext.Provider value={{ setChats, setUsers }}>
            {children}
          </LayoutContext.Provider>
        </div>

        <div className={'users'}>
          <UserIndex users={users} />
        </div>
      </div>
    </div>
  );
};

Layout.propTypes = {
  className: PropTypes.string,
  children: PropTypes.element,
};

const StyledLayout = styled(Layout)`
  .container {
    display: flex;
  }

  .chats {
    background-color: #4df0d5;
  }

  .content {
    padding: 1rem;
    flex: 4 1 0%;
    background-color: #ae87e0;
  }

  .users {
    background-color: #4df0d5;
    padding: 1rem;
  }
`;

export default StyledLayout;
