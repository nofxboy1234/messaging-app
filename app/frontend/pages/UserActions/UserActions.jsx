import { useContext } from 'react';
import { ChatsContext } from '../Layout';
import IncomingFriendActions from './IncomingFriendActions';
import OutgoingFriendActions from './OutgoingFriendActions';
import FriendActions from './FriendActions';
import StrangerActions from './StrangerActions';

function UserActions({ user, userType }) {
  let actions;
  switch (userType) {
    case 'friend':
      actions = <FriendActions user={user} />;
      break;
    case 'outgoing':
      actions = <OutgoingFriendActions user={user} />;
      break;
    case 'incoming':
      actions = <IncomingFriendActions user={user} />;
      break;
    case 'stranger':
      actions = <StrangerActions user={user} />;
      break;
  }

  return actions;
}

export default UserActions;
