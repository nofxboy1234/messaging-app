import api from '../../../pathHelpers';
import styled from 'styled-components';
import Button from '../../Buttons/Button';
import PropTypes from 'prop-types';

function CancelFriendRequestButton({ className, friendRequest }) {
  return (
    <Button
      className={className}
      text={'Cancel'}
      onClick={() => {
        const options = {
          onBefore: () =>
            confirm(
              `Cancel friend request to ${friendRequest.friend.profile.username}?`,
            ),
        };

        api.friendRequests.destroy({ obj: friendRequest, options: options });
      }}
    />
  );
}

CancelFriendRequestButton.propTypes = {
  className: PropTypes.string,
  friendRequest: PropTypes.object,
};

const StyledCancelFriendRequestButton = styled(CancelFriendRequestButton)`
  margin: 0 1rem;
`;

export default StyledCancelFriendRequestButton;
