import api from '../../../pathHelpers';
import styled from 'styled-components';
import Button from '../../Buttons/Button';

// function ChatButton({ className, chat }) {
//   function handleChat(e) {
//     e.preventDefault();
//     api.chats.show({ obj: chat });
//   }

//   return (
//     <Link className={className} as="button" type="button" onClick={handleChat}>
//       Chat
//     </Link>
//   );
// }

// ChatButton.propTypes = {
//   className: PropTypes.string,
//   chat: PropTypes.object,
// };

const StyledChatButton = styled(Button).attrs((props) => ({
  text: 'Chat',
  onClick: () => api.chats.show({ obj: props.chat }),
}))``;

// const StyleChatButton = <StyledChatButton></StyledChatButton>;

export default StyledChatButton;
