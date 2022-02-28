import "./App.css";
import Login from "./pages/Login";
import Post from "./components/Post/Post";
import UserProfile from "./pages/UserProfile/UserProfile";
import Navbar from "./components/Navbar/Navbar";
import UserTeams from "./components/UserTeams/UserTeams";

function App() {
  return (
    <div className="App">
      {/* <Navbar />
      <Post />
      <UserTeams />*/}
      <UserProfile />
      {/* <Login /> */}
    </div>
  );
}

export default App;
