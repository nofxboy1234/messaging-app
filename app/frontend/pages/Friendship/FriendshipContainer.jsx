import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

function FriendshipContainer({ className, children, handleClick }) {
  return (
    <div className={className} id="friendship-container" onClick={handleClick}>
      {children}
    </div>
  );
}

FriendshipContainer.propTypes = {
  className: PropTypes.string,
  children: PropTypes.object,
  handleClick: PropTypes.func,
};

const StyledFriendshipContainer = styled(FriendshipContainer)`
  --bg-color: #5fffaf;
  --active-bg-color: white;

  background-color: var(--bg-color);

  transition: padding 1s ease-out 0s;

  ${(props) =>
    props.$active &&
    css`
      background-color: var(--active-bg-color);
      padding: 3rem 0;
    `}

  display: flex;
  flex-direction: column;
`;

export default StyledFriendshipContainer;
