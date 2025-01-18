import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from '@inertiajs/react';
import api from '../../pathHelpers';

function FriendshipCategory({ className }) {
  return (
    <div className={className}>
      <div>Friends:</div>
      <div>
        <Link href={api.friendships.index.path()}>All</Link>
      </div>
      <div>
        <Link href={api.friendRequests.index.path()}>Pending</Link>
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
