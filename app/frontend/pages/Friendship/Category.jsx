import PropTypes from 'prop-types';
import styled from 'styled-components';

function FriendshipCategory({ className }) {
  return (
    <div className={className}>
      <div>
        <div>Friends:</div>
        <div>All</div>
        <div>Pending</div>
      </div>
    </div>
  );
}

FriendshipCategory.propTypes = {
  className: PropTypes.string,
};

const StyledFriendshipCategory = styled(FriendshipCategory)`
  /* flex: 1 1 0;
  display: flex;
  flex-direction: column;
  overflow: auto;

  > div#friendships {
    flex: 1 1 0;
    display: flex;
    flex-direction: column;
  } */
`;

export default StyledFriendshipCategory;
