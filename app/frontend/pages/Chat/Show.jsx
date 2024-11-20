import { Link, Head } from '@inertiajs/react';
import Chat from './Chat';

export default function Show({ chat, flash }) {
  const onDestroy = (e) => {
    if (!confirm('Are you sure you want to delete this chat?')) {
      e.preventDefault();
    }
  };

  return (
    <>
      <Head title={`Chat #${chat.id}`} />

      {flash.notice && <p style={{ color: 'green' }}>{flash.notice}</p>}

      <Chat chat={chat} />
    </>
  );
}
