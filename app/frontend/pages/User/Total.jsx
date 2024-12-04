import PropTypes from 'prop-types';

function UserTotal({ users }) {
  console.log('render User/Total');

  return <div>USERS-{users.length}</div>;
}

UserTotal.propTypes = {
  users: PropTypes.array,
};

export default UserTotal;
