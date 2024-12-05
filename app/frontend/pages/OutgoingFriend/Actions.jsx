import PropTypes from 'prop-types';
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

OutgoingFriendActions.propTypes = {
  user: PropTypes.object,
  setRelationship: PropTypes.func,
};

export default OutgoingFriendActions;
