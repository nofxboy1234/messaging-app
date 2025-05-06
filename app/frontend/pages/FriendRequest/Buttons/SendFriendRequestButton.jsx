import { usePage } from '@inertiajs/react';
import api from '../../../pathHelpers';
import styled from 'styled-components';
import Button from '../../Buttons/Button';
import PropTypes from 'prop-types';

function SendFriendRequestButton({ className, user }) {
  const { shared } = usePage().props;

  return (
    <Button
      className={className}
      text={'Send friend request'}
      onClick={() => {
        const data = {
          user_id: shared.current_user.id,
          friend_id: user.id,
        };

        const options = {
          onBefore: () =>
            confirm(`Send friend request to ${user.profile.username}?`),
        };

        api.friendRequests.create({ data: data, options });
      }}
    />
  );
}

SendFriendRequestButton.propTypes = {
  className: PropTypes.string,
  user: PropTypes.object,
};

const StyledSendFriendRequestButton = styled(SendFriendRequestButton)``;

export default StyledSendFriendRequestButton;
