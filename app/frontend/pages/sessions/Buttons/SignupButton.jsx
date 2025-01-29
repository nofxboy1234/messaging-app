import styled from 'styled-components';
import Button from '../../Buttons/Button';
import PropTypes from 'prop-types';
import api from '../../../pathHelpers';

function SignupButton({ className }) {
  return (
    <Button
      className={className}
      text={'Sign up'}
      onClick={() => {
        api.registrations.new();
      }}
      type="submit"
    />
  );
}

SignupButton.propTypes = {
  className: PropTypes.string,
  data: PropTypes.object,
};

const StyledSignupButton = styled(SignupButton)``;

export default StyledSignupButton;
