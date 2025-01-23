import api from '../../../pathHelpers';
import styled from 'styled-components';
import Button from '../../Buttons/Button';
import PropTypes from 'prop-types';

function RejectFriendRequestButton({ className, friendRequest }) {
  return (
    <Button
      className={className}
      text={'Reject Friend Request'}
      onClick={() => {
        const options = {
          onBefore: () =>
            confirm(
              `Reject friend request from ${friendRequest.user.profile.username}?`,
            ),
          onFinish: () => {
            api.rejectFriendRequestBroadcast.create({ data: friendRequest });
          },
        };

        api.friendRequests.destroy({ obj: friendRequest, options: options });
      }}
    />
  );
}

RejectFriendRequestButton.propTypes = {
  className: PropTypes.string,
  friendRequest: PropTypes.object,
};

const StyledRejectFriendRequestButton = styled(RejectFriendRequestButton)``;

export default StyledRejectFriendRequestButton;
