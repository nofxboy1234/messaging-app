import { usePage } from '@inertiajs/react';
import FriendIndex from '../Friend/Index';

function Home() {
  const { shared } = usePage().props;

  return <FriendIndex friends={shared.friends} />;
}

export default Home;
