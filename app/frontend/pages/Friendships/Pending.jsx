import { Link, Head } from '@inertiajs/react';
import Layout from '../Layout';

export default function Index({ shared, outgoing, incoming }) {
  return (
    <Layout>
      <Head title={'Pending Friends'} />

      <h1>Outgoing Friend Requests - </h1>
      <div>
        {outgoing.map((user) => (
          <div key={user.id}>
            <div>{user.profile.picture}</div>
            <div>{user.profile.username}</div>
          </div>
        ))}
      </div>

      <h1>Incoming Friend Requests - </h1>
      <div>
        {incoming.map((user) => (
          <div key={user.id}>
            <div>{user.profile.picture}</div>
            <div>{user.profile.username}</div>
          </div>
        ))}
      </div>
    </Layout>
  );
}
