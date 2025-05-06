import api from '../../../pathHelpers';
import styled from 'styled-components';
import Button from '../../Buttons/Button';
import PropTypes from 'prop-types';

function RejectFriendRequestButton({ className, friendRequest }) {
  return (
    <Button
      className={className}
      text={'Reject friend request'}
      onClick={() => {
        const options = {
          onBefore: () =>
            confirm(
              `Reject friend request from ${friendRequest.user.profile.username}?`,
            ),
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

const StyledRejectFriendRequestButton = styled(RejectFriendRequestButton)`
  margin: 0;
`;

export default StyledRejectFriendRequestButton;
