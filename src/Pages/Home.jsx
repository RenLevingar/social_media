import '../App.css';
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="App">
      <header className="App-header">
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
