import SendFriendRequestButton from './SendFriendRequestButton';

function Actions({ user, setRelationship }) {
  return (
    <div>
      <SendFriendRequestButton user={user} setRelationship={setRelationship} />
    </div>
  );
}

export default Actions;
