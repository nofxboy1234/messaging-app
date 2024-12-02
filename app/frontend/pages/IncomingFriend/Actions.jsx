import AcceptFriendRequestButton from './AcceptFriendRequestButton';
import RejectFriendRequestButton from './RejectFriendRequestButton';

function Actions({ user, setRelationship }) {
  return (
    <div>
      <AcceptFriendRequestButton
        user={user}
        setRelationship={setRelationship}
      />
      <RejectFriendRequestButton
        user={user}
        setRelationship={setRelationship}
      />
    </div>
  );
}

export default Actions;
