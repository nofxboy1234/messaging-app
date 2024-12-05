import PropTypes from 'prop-types';

function UserTotal({ users }) {
  return <div>USERS-{users.length}</div>;
}

UserTotal.propTypes = {
  users: PropTypes.array,
};

export default UserTotal;
