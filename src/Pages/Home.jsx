import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Home</h1>
        <Link
          to={"/"}
        >
          Back
        </Link>
      </header>
    </div>
  );
}

export default Home;
