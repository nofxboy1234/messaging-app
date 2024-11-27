import { Link } from '@inertiajs/react';

function AcceptFriendRequestButton() {
  return <button>Accept Friend Request</button>;
}

function RejectFriendRequestButton() {
  return <button>Reject Friend Request</button>;
}

function CancelFriendRequestButton() {
  return <button>Cancel Friend Request</button>;
}

function UnfriendButton() {
  return <button>Unfriend</button>;
}

function SendFriendRequestButton() {
  return <button>Send Friend Request</button>;
}

function Picture({ src }) {
  return <img src={src} alt="Profile picture" />;
}

function Message({ message }) {
  return (
    <div>
      <Picture src={message.user.profile.picture} />
      <div>{message.user.profile.username}</div>
      <div>{message.body}</div>
    </div>
  );
}

function IncomingFriendActions() {
  return (
    <div>
      <AcceptFriendRequestButton />
      <RejectFriendRequestButton />
    </div>
  );
}

function OutgoingFriendActions() {
  return (
    <div>
      <CancelFriendRequestButton />
    </div>
  );
}

function FriendActions() {
  return (
    <div>
      <UnfriendButton />
    </div>
  );
}

function ChatLink({ chat }) {
  return <Link href="">{chat.name}</Link>;
}

function Chat({ chat }) {
  return (
    <div>
      {chat.messages.map((message) => {
        return <Message key={message.id} message={message} />;
      })}
    </div>
  );
}

function MessageBox() {
  return (
    <div>
      <input type="text" />
      <button>Send</button>
    </div>
  );
}

function MemberTotal({ chat }) {
  return <div>MEMBERS-{chat.members.length}</div>;
}

function User({ user }) {
  return (
    <div>
      <Picture src={user.profile.picture} />
      <div>{user.profile.username}</div>
    </div>
  );
}

function UserTotal({ users }) {
  return <div>USERS-{users.count}</div>;
}

function Profile({ profile }) {
  return (
    <div>
      <Picture src={profile.picture} />
      <div>{profile.username}</div>
      <div>{profile.about}</div>
    </div>
  );
}

function UserActions() {
  return (
    <div>
      <IncomingFriendActions />
      <OutgoingFriendActions />
      <FriendActions />
      <SendFriendRequestButton />
    </div>
  );
}

function NavBar({ user }) {
  return (
    <div style={{ border: '2px solid black' }}>
      <div>Home</div>
      <div>Friends</div>
      <div>All</div>
      <div>Pending</div>
      <div>Profile ({user.profile.username})</div>
      <button>Log out</button>
    </div>
  );
}

function ChatIndex({ chats }) {
  return (
    <div style={{ border: '2px solid blue' }}>
      {chats.map((chat) => (
        <ChatLink key={chat.id} chat={chat} />
      ))}
    </div>
  );
}

function ChatShow({ chat }) {
  return (
    <div style={{ border: '2px solid orange' }}>
      <Chat chat={chat} />
      <MessageBox />
    </div>
  );
}

function MemberListIndex({ chat }) {
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

function UserIndex({ users }) {
  return (
    <div>
      <UserTotal users={users} />
      <div>
        {users.map((user) => (
          <User key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}

function ProfileShow({ profile }) {
  return (
    <div>
      <Profile profile={profile} />
      <UserActions />
    </div>
  );
}

const user1 = {
  id: 1,
  profile: {
    id: 1,
    picture: '',
    username: 'user1',
    about: 'Hello I am user1 :)',
  },
};

const user2 = {
  id: 2,
  profile: {
    id: 2,
    picture: '',
    username: 'user2',
    about: 'Hello I am user2 :)',
  },
};

const currentUser = {
  id: 1,
  profile: {
    id: 1,
    picture: '',
    username: 'user1',
    about: 'Hello I am user1 :)',
  },
  chats: [
    {
      id: 1,
      name: 'chat 1',
      messages: [
        { id: 1, user: user1, body: 'hello user2!' },
        { id: 2, user: user2, body: 'bye user1!' },
      ],
      members: [user1, user2],
    },
  ],
};

function Layout({ user = currentUser }) {
  return (
    <div>
      <NavBar user={user} />
      <ChatIndex chats={user.chats} />
      <ChatShow chat={user.chats[0]} />
      <MemberListIndex chat={user.chats[0]} />
    </div>
  );
}

export default Layout;
