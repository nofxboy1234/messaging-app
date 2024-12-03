import CancelFriendRequestButton from './CancelFriendRequestButton';
function Actions({ user, setRelationship }) {
  return (
    <div>
      <CancelFriendRequestButton
        user={user}
        setRelationship={setRelationship}
      />
    </div>
  );
}

export default Actions;
