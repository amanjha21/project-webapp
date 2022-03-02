import Navbar from "../../components/Navbar/Navbar";
import CreatePost from "../../components/Post/CreatePost/CreatePost";
import Post from "../../components/Post/Post";
import UserTeams from "../../components/UserTeams/UserTeams";
import "./Home.css";
const Home = () => {
  return (
    <div className="homepage-grid-main">
      <div className="homepage-nav">
        <Navbar />
      </div>
      <div className="homepage-center">
        <CreatePost type="create" />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
      </div>
      <div className="homepage-right">
        <UserTeams />
      </div>
    </div>
  );
};

export default Home;
