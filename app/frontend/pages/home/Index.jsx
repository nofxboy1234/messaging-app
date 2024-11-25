import FriendIndex from '../Friend/Index';

function Home({ shared }) {
  return <FriendIndex friends={shared.friends} />;
}

export default Home;
