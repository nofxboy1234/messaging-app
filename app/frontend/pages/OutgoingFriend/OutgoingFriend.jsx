import { Link } from '@inertiajs/react';
import api from '../../pathHelpers';
import styled from 'styled-components';
import PropTypes from 'prop-types';

function OutgoingFriend({ className, outgoingFriend }) {
  return (
    <div className={className}>
      <div>
        <Link href={api.profiles.show.path(outgoingFriend.profile)}>
          {outgoingFriend.profile.username}
        </Link>
      </div>
    </div>
  );
}

OutgoingFriend.propTypes = {
  className: PropTypes.string,
  outgoingFriend: PropTypes.object,
};

const StyledOutgoingFriend = styled(OutgoingFriend)`
  display: flex;
  justify-content: space-between;
`;

export default StyledOutgoingFriend;
