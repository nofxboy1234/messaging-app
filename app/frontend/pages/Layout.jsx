import { router, usePage } from '@inertiajs/react';
import styled from 'styled-components';

import ChatIndex from './Chat/Index';
import UserIndex from './User/Index';
import PropTypes from 'prop-types';
import NavBar from './NavBar';

import './styles.css';
import fontUrl from '/assets/fonts/jetbrains_mono/static/JetBrainsMono-Regular.ttf';
import { createContext, useEffect, useState } from 'react';

import { allUserChannel } from '../channels/subscriptions';

export const UsersContext = createContext({
  setUsers: () => {},
  setUserChannel: () => {},
});

const LayoutContainer = ({ className, children }) => {
  const { shared } = usePage().props;
  const [users, setUsers] = useState(shared.users);
  const [userChannel, setUserChannel] = useState(allUserChannel(setUsers));

  useEffect(() => {
    return () => {
      userChannel.unsubscribe();
    };
  }, [userChannel]);

  useEffect(() => {
    return router.on('invalid', (event) => {
      event.preventDefault();
    });
  }, []);

  return (
    <div className={className}>
      <div id="layout">
        {Object.entries(shared.flash).map(([key, value]) => (
          <div className="error" key={key}>
            {value}
          </div>
        ))}

        <NavBar />
        <Main>
          <Chats id="chats">
            <ChatIndex initialChats={shared.chats} />
          </Chats>
          <Content>
            <UsersContext.Provider
              value={{
                setUsers,
                setUserChannel,
              }}
            >
              {children}
            </UsersContext.Provider>
          </Content>
          <Users id="users">
            <UserIndex users={users} />
          </Users>
        </Main>
      </div>
    </div>
  );
};

LayoutContainer.propTypes = {
  className: PropTypes.string,
  children: PropTypes.object,
};

const Main = styled.div`
  flex: 1 1 0;
  display: flex;
  justify-content: center;

  overflow-x: hidden;
  overflow-y: auto;
`;

const Chats = styled.div`
  min-width: 14rem;
  flex: 1 1 0;
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  flex: 4 1 0;
  display: flex;
  justify-content: center;

  border-bottom: 1px solid var(--border-color);

  overflow-x: hidden;
  overflow-y: auto;

  @media (max-width: 1160px) {
    border: solid var(--border-color);
    border-width: 0 1px 1px;
  }
`;

const Users = styled.div`
  min-width: 14rem;
  flex: 1 1 0;
  display: flex;
  flex-direction: column;
`;

const StyledLayoutContainer = styled(LayoutContainer)`
  display: flex;
  justify-content: center;
  height: 100vh;

  overflow-x: hidden;
  overflow-y: auto;

  @font-face {
    font-family: 'JetbrainsMono';
    src: url(${fontUrl});
  }

  font-family: 'JetbrainsMono', monospace;
  background-color: var(--bg-grey);
  color: var(--medium-grey);

  #layout {
    flex: 1 1 auto;
    overflow-x: hidden;
    overflow-y: auto;
    max-width: 1250px;
    display: flex;
    flex-direction: column;
    padding: 0.5rem;
  }

  #nav-bar-chats,
  #nav-bar-users {
    display: none;
  }

  & .error {
    background-color: var(--bg-flash-message);
    color: var(--fg-flash-message);
  }

  @media (max-width: 1160px) {
    padding-top: 4rem;
    padding-bottom: 4rem;

    #chats,
    #users {
      display: none;
    }

    #nav-bar-chats,
    #nav-bar-users {
      display: flex;
    }
  }
`;

export default StyledLayoutContainer;
