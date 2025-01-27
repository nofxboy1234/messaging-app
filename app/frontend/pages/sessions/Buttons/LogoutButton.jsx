import api from '../../../pathHelpers';
import styled from 'styled-components';
import Button from '../../Buttons/Button';
import PropTypes from 'prop-types';

function LogoutButton({ className, session }) {
  return (
    <Button
      className={className}
      text={'Log out'}
      onClick={() => {
        api.sessions.destroy({
          obj: session,
        });
      }}
    />
  );
}

LogoutButton.propTypes = {
  className: PropTypes.string,
  session: PropTypes.object,
};

const StyledLogoutButton = styled(LogoutButton)``;

export default StyledLogoutButton;
