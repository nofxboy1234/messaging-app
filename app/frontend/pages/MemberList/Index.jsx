import MemberTotal from '../Chat/MemberTotal';
import User from '../User/User';

function Index({ chat }) {
  return (
    <div style={{ border: '2px solid fuchsia' }}>
      <MemberTotal chat={chat} />
      <div>
        {chat.members.map((user) => (
          <User key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}

export default Index;
