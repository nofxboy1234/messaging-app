import SendFriendRequestButton from './SendFriendRequestButton';

function StrangerActions({ user, setRelationship }) {
  return (
    <div>
      <SendFriendRequestButton user={user} setRelationship={setRelationship} />
    </div>
  );
}

export default StrangerActions;
