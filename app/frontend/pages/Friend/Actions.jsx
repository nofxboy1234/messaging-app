import UnfriendButton from './UnfriendButton';
import ChatButton from './ChatButton';
import PropTypes from 'prop-types';

function FriendActions({ friend, setRelationship }) {
  console.log('render Friend/Actions');

  return (
    <div>
      <ChatButton friend={friend} />
      <UnfriendButton friend={friend} setRelationship={setRelationship} />
    </div>
  );
}

FriendActions.propTypes = {
  friend: PropTypes.object,
  setRelationship: PropTypes.func,
};

export default FriendActions;
