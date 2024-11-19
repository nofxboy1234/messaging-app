import { usePage, Link } from '@inertiajs/react';
import styled from 'styled-components';
import api from '../pathHelpers';

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
          // href={`/sessions/${shared.session.id}`}
          as="button"
          type="button"
          method="delete"
        >
          Log out
        </Link>
        <Link href={`/profiles/${shared.profile.id}`}>
          Profile ({shared.current_user.email.split('@')[0]})
        </Link>
        {' | '}
        Friends
        {' | '}
        <Link href="/friendships/accepted">Online</Link>
        {' | '}
        <Link href={api.friends.index.path()}>All</Link>
        {' | '}
        <Link href="/friendships/pending">Pending</Link>
        {/* <Link href="/chats/new">New chat</Link>

        <h1>Chats</h1>
        <div>
          {shared.chats.map((chat) => (
            <div key={chat.id}>
              <div>{chat.name}</div>
              <p>
                <Link href={`/chats/${chat.id}`}>Show this chat</Link>
              </p>
            </div>
          ))}
        </div> */}
      </div>
      <br></br>
      <div className={'content'}>
        <div className={'children'}>{children}</div>
        <div className={'users'}>
          {shared.users.map((user) => (
            <div key={user.id}>
              <Link href={`/profiles/${user.profile.id}`}>
                {user.profile.username}
              </Link>
            </div>
            // <div key={user.id}>{user.profile.username}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

const StyledLayout = styled(Layout)`
  .content {
    display: flex;
  }

  .children {
    flex: 4 1 0%;
    background-color: greenyellow;
  }

  .users {
    flex: 1 1 0%;
    background-color: yellow;
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
