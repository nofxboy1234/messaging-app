import PropTypes from 'prop-types';
import AcceptFriendRequestButton from './AcceptFriendRequestButton';
import RejectFriendRequestButton from './RejectFriendRequestButton';

function IncomingFriendRequestActions({ user }) {
  return (
    <div>
      <AcceptFriendRequestButton user={user} />
      <RejectFriendRequestButton user={user} />
    </div>
  );
}

IncomingFriendRequestActions.propTypes = {
  user: PropTypes.object,
  setRelationship: PropTypes.func,
};

export default IncomingFriendRequestActions;
