import { Link } from '@inertiajs/react';
import { useState } from 'react';

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

function ChatButton() {
  return <button>Chat</button>;
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
      <ChatButton />
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
  // const [message, setMessage] = useState('');

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
  return <div>USERS-{users.length}</div>;
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

function ChatIndex({ initialChats = currentUser.chats }) {
  // const [chats, setChats] = useState(initialChats);

  return (
    <div style={{ border: '2px solid blue' }}>
      {chats.map((chat) => (
        <ChatLink key={chat.id} chat={chat} />
      ))}
    </div>
  );
}

function ChatShow({ chat = currentUser.chats[0] }) {
  return (
    <div style={{ border: '2px solid orange' }}>
      <Chat chat={chat} />
      <MessageBox />
    </div>
  );
}

function MemberListIndex({ chat = currentUser.chats[0] }) {
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

function UserIndex({ users = currentUser.chats[0].members }) {
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

function ProfileShow({ profile = currentUser.profile }) {
  return (
    <div>
      <Profile profile={profile} />
      <UserActions />
    </div>
  );
}

function ProfileForm({ profile }) {
  const [username, setUsername] = useState(profile.username);
  const [picture, setPicture] = useState(profile.picture);
  const [about, setAbout] = useState(profile.about);

  return (
    <div>
      <div>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" value={username} />
      </div>
      <div>
        <label htmlFor="picture">Picture</label>
        <input type="text" id="picture" value={picture} />
      </div>
      <div>
        <label htmlFor="about">About</label>
        <input type="text" id="about" value={about} />
      </div>
      <div>
        <button type="submit">Save</button>
      </div>
    </div>
  );
}

function ProfileEdit({ profile = currentUser.profile }) {
  return (
    <div>
      <ProfileForm profile={profile} />
    </div>
  );
}

function Friend({ friend }) {
  return (
    <div>
      <User user={friend} />
      <FriendActions />
    </div>
  );
}

function FriendTotal({ friends }) {
  return <div>friends-{friends.length}</div>;
}

function FriendIndex({ friends = currentUser.friends }) {
  return (
    <div>
      <FriendTotal friends={friends} />
      <div>
        {friends.map((friend) => (
          <Friend key={friend.id} friend={friend} />
        ))}
      </div>
    </div>
  );
}

function IncomingFriend({ incomingFriend }) {
  return (
    <div>
      <User user={incomingFriend} />
      <IncomingFriendActions />
    </div>
  );
}

function IncomingFriendTotal({ incomingFriends }) {
  return <div>Incoming Friend Requests-{incomingFriends.length}</div>;
}

function OutgoingFriend({ outgoingFriend }) {
  return (
    <div>
      <User user={outgoingFriend} />
      <OutgoingFriendActions />
    </div>
  );
}

function OutgoingFriendTotal({ outgoingFriends }) {
  return <div>Outgoing Friend Requests-{outgoingFriends.length}</div>;
}

function PendingFriendIndex({
  incomingFriends = currentUser.incomingFriends,
  outgoingFriends = currentUser.outgoingFriends,
}) {
  return (
    <div>
      <IncomingFriendTotal incomingFriends={incomingFriends} />
      <div>
        {incomingFriends.map((incomingFriend) => (
          <IncomingFriend
            key={incomingFriend.id}
            incomingFriend={incomingFriend}
          />
        ))}
      </div>

      <OutgoingFriendTotal outgoingFriends={outgoingFriends} />
      <div>
        {outgoingFriends.map((outgoingFriend) => (
          <OutgoingFriend
            key={outgoingFriend.id}
            outgoingFriend={outgoingFriend}
          />
        ))}
      </div>
    </div>
  );
}

const user1 = {
  id: 1,
  profile: {
    id: 1,
    picture: 'https://www.gravatar.com/avatar/192e66a3b157be5b9ce37273e72fce12',
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

const user3 = {
  id: 3,
  profile: {
    id: 3,
    picture: '',
    username: 'user3',
    about: 'Hello I am user3 :)',
  },
};

const user4 = {
  id: 4,
  profile: {
    id: 4,
    picture: '',
    username: 'user4',
    about: 'Hello I am user4 :)',
  },
};

const user5 = {
  id: 5,
  profile: {
    id: 5,
    picture: '',
    username: 'user5',
    about: 'Hello I am user5 :)',
  },
};

const currentUser = {
  id: user1.id,
  profile: {
    ...user1.profile,
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
  friends: [user2],
  incomingFriends: [user3, user4],
  outgoingFriends: [user5],
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

// export default ChatIndex;
// export default MemberListIndex;
// export default UserIndex;
// export default ChatShow;
// export default ProfileShow;
export default ProfileEdit;
// export default FriendIndex;
// export default PendingFriendIndex;
