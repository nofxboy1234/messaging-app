import Relationship from '../Profile/Relationship';
import IncomingFriendActions from '../IncomingFriend/Actions';
import OutgoingFriendActions from '../OutgoingFriend/Actions';
import FriendActions from '../Friend/Actions';
import StrangerActions from '../Stranger/Actions';
import { useState } from 'react';
import PropTypes from 'prop-types';

function UserActions({ user, initialRelationship }) {
  const [relationship, setRelationship] = useState(initialRelationship);

  let actions;
  switch (relationship) {
    case Relationship.FRIEND:
      actions = (
        <FriendActions friend={user} setRelationship={setRelationship} />
      );
      break;
    case Relationship.INCOMING_REQUEST:
      actions = (
        <IncomingFriendActions user={user} setRelationship={setRelationship} />
      );
      break;
    case Relationship.OUTGOING_REQUEST:
      actions = (
        <OutgoingFriendActions user={user} setRelationship={setRelationship} />
      );
      break;
    case Relationship.STRANGER:
      actions = (
        <StrangerActions user={user} setRelationship={setRelationship} />
      );
      break;
  }

  return <div>{actions}</div>;
}

UserActions.propTypes = {
  user: PropTypes.object,
  initialRelationship: PropTypes.string,
};

export default UserActions;
