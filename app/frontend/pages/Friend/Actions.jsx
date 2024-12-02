import UnfriendButton from './UnfriendButton';
import ChatButton from './ChatButton';

function Actions({ friend, setRelationship }) {
  return (
    <div>
      <ChatButton friend={friend} />
      <UnfriendButton friend={friend} setRelationship={setRelationship} />
    </div>
  );
}

export default Actions;
