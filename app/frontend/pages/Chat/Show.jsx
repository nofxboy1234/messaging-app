import Chat from './Chat';
import MessageBox from './MessageBox';
import { useEffect, useContext } from 'react';
import { LayoutContext } from '../Layout';
import { usePage } from '@inertiajs/react';

export default function Show({ chat }) {
  const { shared } = usePage().props;
  const { setUsers } = useContext(LayoutContext);

  useEffect(() => {
    setUsers(chat.members);

    return () => {
      setUsers(shared.users);
    };
  }, [chat.members, setUsers, shared.users]);

  return (
    <div>
      <Chat chat={chat} />
      <MessageBox chat={chat} />
    </div>
  );
}
