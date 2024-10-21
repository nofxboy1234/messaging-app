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

      <h1>Chat #{chat.id}</h1>

      <Chat chat={chat} />

      <div>
        <Link href={`/chats/${chat.id}/edit`}>Edit this chat</Link>
        {' | '}
        <Link href="/chats">Back to chats</Link>

        <br />

        <Link
          href={`/chats/${chat.id}`}
          onClick={onDestroy}
          as="button"
          method="delete"
        >
          Destroy this chat
        </Link>
      </div>
    </>
  );
}
