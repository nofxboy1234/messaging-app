import api from '../../../pathHelpers';
import styled from 'styled-components';
import Button from '../../Buttons/Button';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { router } from '@inertiajs/react';

function LogoutButton({ className, session }) {
  useEffect(() => {
    const removeInvalidEventListener = router.on('invalid', (event) => {
      event.preventDefault();
    });

    return () => {
      removeInvalidEventListener();
    };
  }, []);

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
  session: PropTypes.object,
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
