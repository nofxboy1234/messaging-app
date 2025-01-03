import { usePage } from '@inertiajs/react';
import styled from 'styled-components';

import ChatIndex from './Chat/Index';
import UserIndex from './User/Index';
import PropTypes from 'prop-types';
import NavBar from './NavBar';

const Layout = ({ className, children }) => {
  const { shared } = usePage().props;
  const { chat } = usePage().props;

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
            chat={chat}
          />
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
    /* height: 100vh; */
  }

  .chats {
  }

  .content {
    padding: 1rem;
    flex: 4 1 0%;
    background-color: #ae87e0;
  }

  .users {
    background-color: #fff893;
    padding: 1rem;
  }
`;

export default StyledLayout;
