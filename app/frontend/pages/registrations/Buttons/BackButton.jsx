import styled from 'styled-components';
import Button from '../../Buttons/Button';
import PropTypes from 'prop-types';
import api from '../../../pathHelpers';

function BackButton({ className }) {
  return (
    <Button
      className={className}
      text={'Back'}
      onClick={() => {
        api.sessions.new();
      }}
      type="submit"
    />
  );
}

BackButton.propTypes = {
  className: PropTypes.string,
  values: PropTypes.object,
};

const StyledBackButton = styled(BackButton)`
  margin: 0;
`;

export default StyledBackButton;
