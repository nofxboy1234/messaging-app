import { usePage, Link } from '@inertiajs/react';
import styled from 'styled-components';
import api from '../pathHelpers';
import ChatIndex from './Chat/Index';
import UserIndex from './User/Index';
import { useState, createContext } from 'react';

export const ChatsContext = createContext({
  setChats: () => {},
});

const Layout = ({ className, children, users }) => {
  const { shared } = usePage().props;

  const [chats, setChats] = useState(shared.chats);

  console.log('render Layout');

  return (
    <div className={className}>
      <div>
        <Link href="/">Home</Link>
        <Link
          href={api.sessions.destroy.path(shared.session)}
          as="button"
          type="button"
          method="delete"
        >
          Log out
        </Link>
        <Link href={api.profiles.show.path(shared.profile)}>
          Profile ({shared.current_user.email.split('@')[0]})
        </Link>
        {' | '}
        Friends
        {' | '}
        <Link href={api.friends.index.path()}>All</Link>
        {' | '}
        <Link href={api.outgoingFriends.index.path()}>
          Outgoing Friend Requests
        </Link>
        {' | '}
        <Link href={api.incomingFriends.index.path()}>
          Incoming Friend Requests
        </Link>
      </div>

      <br></br>

      <div className="container">
        <div className={'chats'}>
          <ChatIndex chats={chats} />
        </div>

        <div className={'content'}>
          <ChatsContext.Provider value={{ setChats }}>
            {children}
          </ChatsContext.Provider>
        </div>

        <div className={'users'}>
          <UserIndex users={users ? users : shared.users} />
        </div>
      </div>
    </div>
  );
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
