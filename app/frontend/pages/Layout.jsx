import { usePage, Link } from '@inertiajs/react';
import Chat from './Chat/Chat';

export default function Layout({ children }) {
  const { shared } = usePage().props;

  return (
    <main>
      <header>
        {shared.flash.alert && <div>{shared.flash.alert}</div>}
        {shared.flash.notice && <div>{shared.flash.notice}</div>}

        <Link
          href={`/sessions/${shared.session.id}`}
          as="button"
          type="button"
          method="delete"
        >
          Log out
        </Link>
        <Link href={`/profiles/${shared.profile.id}`}>
          Profile ({shared.current_user.email.split('@')[0]})
        </Link>
        {' | '}
        <Link href="/chats/new">New chat</Link>

        <h1>Chats</h1>
        <div>
          {shared.chats.map((chat) => (
            <div key={chat.id}>
              <div>{chat.name}</div>
              <p>
                <Link href={`/chats/${chat.id}`}>Show this chat</Link>
              </p>
            </div>
          ))}
        </div>
      </header>
      <br></br>
      <article>{children}</article>
    </main>
  );
}
