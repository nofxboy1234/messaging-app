import styled from 'styled-components';
import Button from '../../Buttons/Button';
import PropTypes from 'prop-types';

function UpdateProfileButton({ className, onSubmit, form }) {
  return (
    <Button
      className={className}
      text={'Update'}
      onClick={() => {
        onSubmit(form);
      }}
      type="submit"
    />
  );
}

UpdateProfileButton.propTypes = {
  className: PropTypes.string,
  onSubmit: PropTypes.func,
  form: PropTypes.object,
};

const StyledUpdateProfileButton = styled(UpdateProfileButton)``;

export default StyledUpdateProfileButton;
