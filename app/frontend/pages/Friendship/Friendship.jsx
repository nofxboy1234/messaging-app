import styled from 'styled-components';
import PropTypes from 'prop-types';
import User from '../User/User';
import ChatButton from './Buttons/ChatButton';
import UnfriendButton from './Buttons/UnfriendButton';

function Friendship({ className, friendship, user }) {
  return (
    <div className={className}>
      <User user={user} />
      <div>
        <ChatButton friendship={friendship} />
        <UnfriendButton friendship={friendship} user={user} />
      </div>
    </div>
  );
}

const StyledFriendship = styled(Friendship)`
  display: flex;
  justify-content: space-between;
`;

Friendship.propTypes = {
  className: PropTypes.string,
  friendship: PropTypes.object,
  user: PropTypes.object,
};

export default StyledFriendship;
