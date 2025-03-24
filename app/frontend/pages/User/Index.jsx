import UserTotal from './Total';
import PropTypes from 'prop-types';
import ProfileLink from '../Profile/Link';
import styled from 'styled-components';

function UserIndex({ className, users }) {
  console.log('render User/Index');

  return (
    <div className={className}>
      <UserTotal users={users} />
      <div id="users">
        {users.map((user) => (
          <ProfileLink key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}

UserIndex.propTypes = {
  className: PropTypes.string,
  users: PropTypes.array,
};

const StyledUserIndex = styled(UserIndex)`
  flex: 1 1 0;
  display: flex;
  flex-direction: column;

  overflow-x: hidden;
  overflow-y: auto;

  border: solid var(--border-color);
  border-width: 0 1px 1px;

  & > div#users {
    flex: 1 1 0;
    display: flex;
    flex-direction: column;
  }
`;

export default StyledUserIndex;
