import { usePage, Link } from '@inertiajs/react';
import styled from 'styled-components';
import api from '../pathHelpers';
import ChatIndex from './Chat/Index';
import UserIndex from './User/Index';

const Layout = ({ className, children }) => {
  const { shared } = usePage().props;

  return (
    <div className={className}>
      <div>
        {shared.flash.alert && <div>{shared.flash.alert}</div>}
        {shared.flash.notice && <div>{shared.flash.notice}</div>}
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
        {/* <Link href="/friendships/accepted">Online</Link>
        {' | '} */}
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
          <ChatIndex chats={shared.chats} />
        </div>
        <div className={'content'}>
          <div className={'children'}>{children}</div>
        </div>
        <div className={'users'}>
          <UserIndex users={shared.users} />
        </div>
      </div>
    </div>
  );
};

const StyledLayout = styled(Layout)`
  .container {
    display: flex;
  }

  .content {
    display: flex;
    padding: 1rem;
    flex: 4 1 0%;
    background-color: #ae87e0;
  }

  .users {
    /* flex: 1 1 0%; */
    background-color: #4df0d5;
    padding: 1rem;
  }

  .chats {
    background-color: #4df0d5;
    /* padding: 1rem; */
  }

  /* .content div {
    flex: 1 1 0%;
  }

  .content .children {
    flex: 6 1 0%;
    background-color: greenyellow;
  } */
`;

export default StyledLayout;
