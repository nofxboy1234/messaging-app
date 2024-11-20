import { Link, Head } from '@inertiajs/react';
import Chat from './Chat';
import api from '../../pathHelpers';
import styled from 'styled-components';

function Index({ chats, flash, className }) {
  return (
    <div className={className}>
      <Head title="Chats" />

      {/* {flash.notice && <p style={{ color: 'green' }}>{flash.notice}</p>} */}

      <div>
        <h1>Chats</h1>
      </div>
      <div>
        {chats.map((chat) => (
          <div key={chat.id}>
            <p>
              <Link href={api.chats.show.path(chat)}>{chat.name}</Link>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

const StyledIndex = styled(Index)`
  padding: 1rem;
`;

export default StyledIndex;
