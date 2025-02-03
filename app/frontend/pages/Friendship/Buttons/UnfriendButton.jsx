import api from '../../../pathHelpers';
import styled from 'styled-components';
import Button from '../../Buttons/Button';
import PropTypes from 'prop-types';

function UnfriendButton({ className, friendship, user }) {
  return (
    <Button
      className={className}
      text={'Unfriend'}
      onClick={() => {
        const options = {
          onBefore: () => confirm(`Unfriend ${user.profile.username}?`),
          onFinish: () => {
            api.unfriendBroadcast.create({ data: friendship });
          },
        };

        api.friendships.destroy({
          obj: friendship,
          options: options,
        });
      }}
    />
  );
}

UnfriendButton.propTypes = {
  className: PropTypes.string,
  friendship: PropTypes.object,
  user: PropTypes.object,
};

const StyledUnfriendButton = styled(UnfriendButton)`
  margin: 0;
`;

export default StyledUnfriendButton;
