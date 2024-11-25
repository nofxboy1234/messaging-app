import { Link } from '@inertiajs/react';
import api from '../../pathHelpers';
import styled from 'styled-components';
// import IncomingFriendActions from '../UserActions/IncomingFriendActions';

function IncomingFriend({ className, friend }) {
  return (
    <div className={className}>
      <div>
        <Link href={api.profiles.show.path(friend.profile)}>
          {friend.profile.username}
        </Link>
        {/* <IncomingFriendActions user={friend} /> */}
      </div>
    </div>
  );
}

const IncomingStyledFriend = styled(IncomingFriend)`
  display: flex;
  justify-content: space-between;
`;

export default IncomingStyledFriend;
