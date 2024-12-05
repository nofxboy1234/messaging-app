import PropTypes from 'prop-types';
import SendFriendRequestButton from './SendFriendRequestButton';

function StrangerActions({ user, setRelationship }) {
  return (
    <div>
      <SendFriendRequestButton user={user} setRelationship={setRelationship} />
    </div>
  );
}

StrangerActions.propTypes = {
  user: PropTypes.object,
  setRelationship: PropTypes.func,
};

export default StrangerActions;
