import api from '../../../pathHelpers';
import styled from 'styled-components';
import Button from '../../Buttons/Button';
import PropTypes from 'prop-types';

function LogoutButton({ className }) {
  return (
    <Button
      className={className}
      text={'Log out'}
      onClick={() => {
        api.sessions.destroy();
      }}
    />
  );
}

LogoutButton.propTypes = {
  className: PropTypes.string,
};

const StyledLogoutButton = styled(LogoutButton)`
  flex: 1 1 0;
  margin: 0;
  padding: 0;
  background-color: unset;
  color: var(--medium-grey);
  border-radius: 0;

  &:hover {
    background-color: var(--bg-color-hover);
  }
`;

export default StyledLogoutButton;
