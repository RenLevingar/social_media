import '../App.css';
import { Link } from "react-router-dom";

function Index() {
  return (
    <div className="App">
      <header className="App-header">
        <Link
          to={"/home"}
        >
          Login
        </Link>
      </header>
    </div>
  );
}

export default Index;
