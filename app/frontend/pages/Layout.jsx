import { Link, usePage } from '@inertiajs/react';

export default function Layout({ children }) {
  const { flash } = usePage().props;

  return (
    <main>
      <header>
        {flash.alert && <div>{flash.alert}</div>}
        {flash.notice && <div>{flash.notice}</div>}
        <Link href="/users/sign_out" method="delete" as="button">
          Sign out
        </Link>
        <Link href="/users/sign_in">Sign in</Link>
      </header>
      <article>{children}</article>
    </main>
  );
}
