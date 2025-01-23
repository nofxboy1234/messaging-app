import api from '../../../pathHelpers';
import styled from 'styled-components';
import Button from '../../Buttons/Button';
import PropTypes from 'prop-types';

function EditProfileButton({ className, profile }) {
  return (
    <Button
      className={className}
      text={'Edit'}
      onClick={() => {
        api.profiles.edit({ obj: profile });
      }}
    />
  );
}

EditProfileButton.propTypes = {
  className: PropTypes.string,
  profile: PropTypes.object,
};

const StyledEditProfileButton = styled(EditProfileButton)``;

export default StyledEditProfileButton;
