import { Link, usePage } from '@inertiajs/react';

export default function Layout({ children }) {
  // const url = usePage().url;
  const { shared } = usePage().props;

  console.log(usePage());

  // let deviseLink = null;

  // if (url != '/users/sign_in') {
  //   deviseLink = shared.current_user ? (
  //     <Link href="/users/sign_out" method="delete" as="button">
  //       Sign out
  //     </Link>
  //   ) : (
  //     <Link href="/users/sign_in">Sign in</Link>
  //   );
  // }

  return (
    <main>
      <header>
        {shared.flash.alert && <div>{shared.flash.alert}</div>}
        {shared.flash.notice && <div>{shared.flash.notice}</div>}
        {/* {deviseLink} */}
      </header>
      <article>{children}</article>
    </main>
  );
}
