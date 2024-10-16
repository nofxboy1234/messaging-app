import { usePage, Link } from '@inertiajs/react';

export default function Layout({ children }) {
  const { shared } = usePage().props;

  return (
    <main>
      <header>
        {shared.flash.alert && <div>{shared.flash.alert}</div>}
        {shared.flash.notice && <div>{shared.flash.notice}</div>}

        <div>
          <Link
            href={`/sessions/${shared.session.id}`}
            as="button"
            type="button"
            method="delete"
          >
            Log out
          </Link>
        </div>

        <div>
          <Link href={'/'}>Transient chat</Link>
        </div>

        <div>
          <Link href={'/persisted_chat/index'}>Persisted chat</Link>
        </div>

        <div>
          <Link href={`/profiles/${shared.current_user.id}`}>Profile</Link>
        </div>
      </header>
      <br></br>
      <article>{children}</article>
    </main>
  );
}
