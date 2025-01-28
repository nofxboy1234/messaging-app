import { usePage } from '@inertiajs/react';
import styled from 'styled-components';

import ChatIndex from './Chat/Index';
import UserIndex from './User/Index';
import PropTypes from 'prop-types';
import NavBar from './NavBar';

import styles from './Layout.module.css';
import fontUrl from '/assets/fonts/overpass_mono/static/OverpassMono-Regular.ttf';

const LayoutContainer = ({ className, children }) => {
  const { shared, chat } = usePage().props;
  const component = usePage().component;

  const isShowingChat = () => component === 'Chat/Show';

  return (
    <div className={className}>
      <div id="layout">
        <NavBar />
        <Main>
          <Chats id="chats">
            <ChatIndex initialChats={shared.chats} />
          </Chats>
          <Content>{children}</Content>
          <Users id="users">
            <UserIndex
              initialUsers={isShowingChat() ? chat.members : shared.users}
              isShowingChat={isShowingChat()}
              chat_id={isShowingChat() ? chat.id : undefined}
            />
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
  flex-direction: column;
  border-color: rgb(0, 255, 42);
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
  padding: 0.3rem;

  @font-face {
    font-family: 'OverpassMono';
    src: url(${fontUrl});
  }

  font-family: 'OverpassMono', monospace;
  background-color: var(--bg-grey);
  color: var(--medium-grey);

  #layout {
    flex: 1 1 0;
    max-width: 2560px;
    display: flex;
    flex-direction: column;
    border-color: aqua;
  }

  #nav-bar-chats,
  #nav-bar-users {
    display: none;
  }

  @media (max-width: 1160px) {
    #chats,
    #users {
      display: none;
    }

    #nav-bar-chats,
    #nav-bar-users {
      display: block;
    }
  }
`;

export default StyledLayoutContainer;
