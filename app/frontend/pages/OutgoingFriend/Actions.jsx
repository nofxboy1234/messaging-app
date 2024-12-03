import CancelFriendRequestButton from './CancelFriendRequestButton';
function OutgoingFriendActions({ user, setRelationship }) {
  return (
    <div>
      <CancelFriendRequestButton
        user={user}
        setRelationship={setRelationship}
      />
    </div>
  );
}

export default OutgoingFriendActions;
