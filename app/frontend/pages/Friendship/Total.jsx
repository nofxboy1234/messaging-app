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

  @media (max-width: 1160px) {
    border: solid var(--border-color);
    border-width: 0 0 1px;
  }
`;

export default StyledFriendshipTotal;
