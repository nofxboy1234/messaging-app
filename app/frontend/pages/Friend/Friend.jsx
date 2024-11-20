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
      <div>Chat</div>
    </div>
  );
}

const StyledFriend = styled(Friend)`
  display: flex;
  justify-content: space-between;
`;

export default StyledFriend;
