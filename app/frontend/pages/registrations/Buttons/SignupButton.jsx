import styled from 'styled-components';
import Button from '../../Buttons/Button';
import PropTypes from 'prop-types';
import api from '../../../pathHelpers';

function SignupButton({ className, values }) {
  return (
    <Button
      className={className}
      text={'Sign up'}
      onClick={() => {
        const options = {
          preserveState: true,
        };
        api.registrations.create({ data: values, options: options });
      }}
      type="submit"
    />
  );
}

SignupButton.propTypes = {
  className: PropTypes.string,
  values: PropTypes.object,
};

const StyledSignupButton = styled(SignupButton)`
  margin: 0;
`;

export default StyledSignupButton;
