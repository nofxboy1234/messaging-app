import { usePage } from '@inertiajs/react';
import styled from 'styled-components';

import ChatIndex from './Chat/Index';
import UserIndex from './User/Index';
import PropTypes from 'prop-types';
import NavBar from './NavBar';

import styles from './Layout.module.css';

const LayoutContainer = ({ className, children }) => {
  const { shared, chat } = usePage().props;
  const component = usePage().component;

  const isShowingChat = () => component === 'Chat/Show';

  return (
    <div className={className}>
      <div id="layout">
        <NavBar />
        <Main>
          <Chats>
            <ChatIndex initialChats={shared.chats} />
          </Chats>
          <Content>{children}</Content>
          <Users>
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
  display: flex;
  height: 100vh;
`;

const Chats = styled.div`
  min-width: 14rem;
  flex: 1 1 0;
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  flex: 6 1 0%;
  background-color: #ae87e0;
`;

const Users = styled.div`
  flex: 1.5;
  background-color: #fff893;
  padding: 1rem;
`;

const StyledLayoutContainer = styled(LayoutContainer)`
  display: flex;
  justify-content: center;
  height: 100vh;
  border: 4px solid blueviolet;
  padding: 0.3rem;

  div {
    border: 4px solid rgb(255, 0, 140);
    padding: 0.3rem;
  }

  #layout {
    flex: 1 1 0;
    max-width: 2560px;
    display: flex;
    flex-direction: column;
    border-color: aqua;
  }
`;

export default StyledLayoutContainer;
