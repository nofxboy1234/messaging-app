import PropTypes from 'prop-types';
import styled from 'styled-components';

function UserTotal({ className, users }) {
  return <div className={className}>USERS-{users.length}</div>;
}

UserTotal.propTypes = {
  className: PropTypes.string,
  users: PropTypes.array,
};

const StyledUserTotal = styled(UserTotal)`
  border-bottom: 1px solid var(--border-color);
`;

export default StyledUserTotal;
