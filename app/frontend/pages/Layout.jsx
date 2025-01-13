import { usePage } from '@inertiajs/react';
import styled from 'styled-components';

import ChatIndex from './Chat/Index';
import UserIndex from './User/Index';
import PropTypes from 'prop-types';
import NavBar from './NavBar';

import styles from './Layout.module.css';

const Layout = ({ className, children }) => {
  const { shared, chat } = usePage().props;
  const component = usePage().component;

  const isShowingChat = () => component === 'Chat/Show';

  return (
    <div className={className}>
      <NavBar />

      <Container>
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
      </Container>
    </div>
  );
};

Layout.propTypes = {
  className: PropTypes.string,
  children: PropTypes.object,
};

const Container = styled.div`
  display: flex;
  height: 100vh;
`;

const Chats = styled.div`
  flex: 1;
  background-color: #4df08b;
  padding: 1rem;
`;

const Content = styled.div`
  padding: 1rem;
  flex: 6 1 0%;
  background-color: #ae87e0;
`;

const Users = styled.div`
  flex: 1.5;
  background-color: #fff893;
  padding: 1rem;
`;

const StyledLayout = styled(Layout)`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

export default StyledLayout;
