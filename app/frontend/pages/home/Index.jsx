import FriendIndex from '../Friend/Index';

function Home({ shared }) {
  console.log('*** Home rendering');

  return <FriendIndex friends={shared.friends} />;
}

export default Home;
