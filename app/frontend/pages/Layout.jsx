import { Link } from '@inertiajs/react';

export default function Layout({ children }) {
  return (
    <main>
      <header>
        <Link href="/users/sign_out" method="delete" as="button">
          Sign out
        </Link>
        <Link href="/users/sign_in">Sign in</Link>
      </header>
      <article>{children}</article>
    </main>
  );
}
