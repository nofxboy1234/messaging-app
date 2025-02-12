import styled from 'styled-components';
import Button from '../../Buttons/Button';
import PropTypes from 'prop-types';
import api from '../../../pathHelpers';

function LoginButton({ className, data }) {
  return (
    <Button
      className={className}
      text={'Log in'}
      onClick={() => {
        const options = {
          preserveState: true,
        };
        api.sessions.create({ data: data, options: options });
      }}
      type="submit"
    />
  );
}

LoginButton.propTypes = {
  className: PropTypes.string,
  data: PropTypes.object,
};

const StyledLoginButton = styled(LoginButton)`
  margin: 0;
`;

export default StyledLoginButton;
