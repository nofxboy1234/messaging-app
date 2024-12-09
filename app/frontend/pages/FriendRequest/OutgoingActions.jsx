import PropTypes from 'prop-types';
import CancelFriendRequestButton from './CancelFriendRequestButton';

function OutgoingFriendRequestActions({ user }) {
  return (
    <div>
      <CancelFriendRequestButton user={user} />
    </div>
  );
}

OutgoingFriendRequestActions.propTypes = {
  user: PropTypes.object,
  setRelationship: PropTypes.func,
};

export default OutgoingFriendRequestActions;
