import { usePage } from '@inertiajs/react';
import styled from 'styled-components';

import ChatIndex from './Chat/Index';
import UserIndex from './User/Index';
import PropTypes from 'prop-types';
import NavBar from './NavBar';

const Layout = ({ className, children }) => {
  const { shared, chat } = usePage().props;
  const component = usePage().component;

  const isShowingChat = () => component === 'Chat/Show';

  return (
    <div className={className}>
      <NavBar />

      <br></br>

      <div className="container">
        <div className={'chats'}>
          <ChatIndex initialChats={shared.chats} />
        </div>

        <div className={'content'}>{children}</div>

        <div className={'users'}>
          <UserIndex
            initialUsers={chat ? chat.members : shared.users}
            isShowingChat={isShowingChat()}
            chat_id={isShowingChat() ? chat.id : undefined}
            // chat_id={chat ? chat.id : undefined}
          />
        </div>
      </div>
    </div>
  );
};

Layout.propTypes = {
  className: PropTypes.string,
  children: PropTypes.object,
};

const StyledLayout = styled(Layout)`
  .container {
    display: flex;
    /* height: 100vh; */
  }

  .chats {
    flex: 1;
  }

  .content {
    padding: 1rem;
    flex: 6 1 0%;
    background-color: #ae87e0;
  }

  .users {
    flex: 1.5;
    background-color: #fff893;
    padding: 1rem;
  }
`;

export default StyledLayout;
