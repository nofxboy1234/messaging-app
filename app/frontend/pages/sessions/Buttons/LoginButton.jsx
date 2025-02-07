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
        api.sessions.create({ data: data });
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
