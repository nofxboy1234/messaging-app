import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from '@inertiajs/react';
import api from '../../pathHelpers';
import UserLink from '../User/Link';

function FriendshipCategory({ className }) {
  return (
    <div className={className}>
      <div>Friends:</div>
      <div>
        <UserLink targetPath={api.friendships.index.path()}>All</UserLink>
      </div>
      <div>
        <UserLink targetPath={api.friendRequests.index.path()}>
          Pending
        </UserLink>
      </div>
    </div>
  );
}

FriendshipCategory.propTypes = {
  className: PropTypes.string,
};

const StyledFriendshipCategory = styled(FriendshipCategory)`
  & .link {
    border: 1px solid var(--border-color);
    min-height: 51.5px;

    &:hover {
      background-color: var(--bg-color-hover);
    }
  }
`;

export default StyledFriendshipCategory;
