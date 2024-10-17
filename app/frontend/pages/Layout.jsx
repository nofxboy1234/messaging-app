import { usePage, Link } from '@inertiajs/react';

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
        {' | '}
        <Link href={'/'}>Transient chat</Link>
        {' | '}
        <Link href={'/persisted_chat/index'}>Persisted chat</Link>
        {' | '}
        <Link href={`/profiles/${shared.profile.id}`}>Profile</Link>
      </header>
      <br></br>
      <article>{children}</article>
    </main>
  );
}
