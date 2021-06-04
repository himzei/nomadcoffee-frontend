import { isLoggedInVar } from "../apollo";

function Home() {
  return (
    <dov>
      <h1>Home</h1>
      <button onClick={() => isLoggedInVar(false)}>Log out</button>
    </dov>
  );
}
export default Home;
