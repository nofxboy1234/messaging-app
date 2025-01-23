import styled from 'styled-components';
import Button from '../../Buttons/Button';
import PropTypes from 'prop-types';

function SendMessageButton({ className, onClick }) {
  return (
    <Button
      className={className}
      text={'Send'}
      onClick={onClick}
      type="submit"
    />
  );
}

SendMessageButton.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
};

const StyledSendMessageButton = styled(SendMessageButton)``;

export default StyledSendMessageButton;
