import { Link, Head } from '@inertiajs/react';
import api from '../../pathHelpers';

export default function Index({ users, flash }) {
  return (
    <div>
      <Head title="Users" />

      {/* {flash.notice && <p style={{ color: 'green' }}>{flash.notice}</p>} */}

      <h1>Users</h1>
      <div>
        {users.map((user) => (
          <div key={user.id}>
            <p>
              <Link href={api.profiles.show.path(user.profile)}>
                {user.profile.username}
              </Link>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
