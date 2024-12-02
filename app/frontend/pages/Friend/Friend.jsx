import { Link } from '@inertiajs/react';
import api from '../../pathHelpers';
import styled from 'styled-components';
import User from '../User/User';
import UserActions from '../User/Actions';
import Relationship from '../Profile/Relationship';

function Friend({ className, friend }) {
  return (
    <div className={className}>
      <User user={friend} />
      <UserActions user={friend} initialRelationship={Relationship.FRIEND} />
    </div>
  );
}

const StyledFriend = styled(Friend)`
  display: flex;
  justify-content: space-between;
`;

export default StyledFriend;
