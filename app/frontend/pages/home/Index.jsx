import { Link, usePage } from '@inertiajs/react';
import Layout from '../Layout';

function Home({ session }) {
  return (
    <Layout>
      <div>Home</div>
      <Link
        href={`/sessions/${session.id}`}
        as="button"
        type="button"
        method="delete"
      >
        Log out
      </Link>
    </Layout>
  );
}

export default Home;
