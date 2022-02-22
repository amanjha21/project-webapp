import "./App.css";
import Login from "./pages/Login";
import Post from "./components/Post/Post";
import Profile from "./components/Profile/profile";
import Navbar from "./components/Navbar/Navbar";
import UserTeams from "./components/UserTeams/UserTeams";

function App() {
  return (
    <div className="App">
      <Navbar />
      {/*<Post />
      <UserTeams />*/}
      <Profile />
      {/* <Login /> */}
    </div>
  );
}

export default App;
