import { Link, usePage } from '@inertiajs/react';

export default function Layout({ children }) {
  const { shared } = usePage().props;

  return (
    <main>
      <header>
        {shared.flash.alert && <div>{shared.flash.alert}</div>}
        {shared.flash.notice && <div>{shared.flash.notice}</div>}

        {shared.current_user ? (
          <Link href="/users/sign_out" method="delete" as="button">
            Sign out
          </Link>
        ) : (
          <Link href="/users/sign_in">Sign in</Link>
        )}
      </header>
      <article>{children}</article>
    </main>
  );
}
