import { Link } from '@inertiajs/react';
import api from '../../pathHelpers';
import styled from 'styled-components';

function Friend({ className, friend }) {
  return (
    <div className={className}>
      <div>
        <Link href={api.profiles.show.path(friend.profile)}>
          {friend.profile.username}
        </Link>
      </div>
      <div>
        <Link
          as="button"
          type="button"
          onClick={(e) => {
            e.preventDefault();
            api.chats.show({ obj: friend.directMessageChat });
          }}
        >
          Chat
        </Link>
      </div>
    </div>
  );
}

const StyledFriend = styled(Friend)`
  display: flex;
  justify-content: space-between;
`;

export default StyledFriend;
