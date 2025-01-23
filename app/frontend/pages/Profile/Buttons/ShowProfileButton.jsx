import api from '../../../pathHelpers';
import styled from 'styled-components';
import Button from '../../Buttons/Button';
import PropTypes from 'prop-types';

function ShowProfileButton({ className, profile }) {
  return (
    <Button
      className={className}
      text={'Show'}
      onClick={() => {
        api.profiles.show({ obj: profile });
      }}
    />
  );
}

ShowProfileButton.propTypes = {
  className: PropTypes.string,
  profile: PropTypes.object,
};

const StyledShowProfileButton = styled(ShowProfileButton)``;

export default StyledShowProfileButton;
