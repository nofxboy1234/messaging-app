import PropTypes from 'prop-types';
import styled from 'styled-components';

function FriendshipTotal({ className, friendships }) {
  return <div className={className}>ALL FRIENDS-{friendships.length}</div>;
}

FriendshipTotal.propTypes = {
  className: PropTypes.string,
  friendships: PropTypes.array,
};

const StyledFriendshipTotal = styled(FriendshipTotal)`
  border-bottom: 1px solid var(--border-color);
`;

export default StyledFriendshipTotal;
