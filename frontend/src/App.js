import "./App.css";
// import Post from "./components/Post/Post";
// import Profile from "./components/Profile/profile";
import Navbar from "./components/Navbar/Navbar";
import UserTeams from "./components/UserTeams/UserTeams";

function App() {
  return (
    <div className="App">
      <Navbar />
      {/* <Post /> */}
      <UserTeams />
      {/* <Profile /> */}
    </div>
  );
}

export default App;
