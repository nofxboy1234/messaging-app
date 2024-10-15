import { usePage, Link } from '@inertiajs/react';

export default function Layout({ children, session }) {
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
      </header>
      <article>{children}</article>
    </main>
  );
}
