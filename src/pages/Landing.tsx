import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <>
      <h1>Mimiccord</h1>
      <p>create fake discord direct messages!</p>
      <Link to="/Creator" className="text-blue-500">
        Open the Creator!
      </Link>
    </>
  );
};

export default Landing;
