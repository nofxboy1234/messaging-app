import api from '../../../pathHelpers';
import styled from 'styled-components';
import Button from '../../Buttons/Button';
import PropTypes from 'prop-types';

function AcceptFriendRequestButton({ className, friendRequest }) {
  return (
    <Button
      className={className}
      text={'Accept Friend Request'}
      onClick={() => {
        const options = {
          onBefore: () =>
            confirm(
              `Accept friend request from ${friendRequest.user.profile.username}?`,
            ),
          onFinish: () => {
            const options = {
              onFinish: () => {
                api.acceptFriendRequestBroadcast.create({
                  data: friendRequest,
                });
              },
            };

            api.friendships.create({ data: friendRequest, options: options });
          },
        };

        api.friendRequests.destroy({ obj: friendRequest, options: options });
      }}
    />
  );
}

AcceptFriendRequestButton.propTypes = {
  className: PropTypes.string,
  friendRequest: PropTypes.object,
};

const StyledAcceptFriendRequestButton = styled(AcceptFriendRequestButton)`
  margin: 0 1rem;
`;

export default StyledAcceptFriendRequestButton;
