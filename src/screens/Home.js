import { logUserOut } from "../apollo";

function Home() {
  return (
    <dov>
      <h1>Welcome</h1>
      <button onClick={() => logUserOut()}>Log out</button>
    </dov>
  );
}
export default Home;
