import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/Navbar/Navbar";
import CreatePost from "../../components/Post/CreatePost/CreatePost";
import Post from "../../components/Post/Post";
import UserTeams from "../../components/UserTeams/UserTeams";
import { getPosts } from "../../redux/post";
import "./Home.css";
const Home = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  useEffect(() => {
    dispatch(getPosts());
  }, []);
  return (
    <div className="homepage-grid-main">
      <div className="homepage-nav">
        <Navbar />
      </div>
      <div className="homepage-center">
        <CreatePost type="create" />
        {posts.isLoading && <h1>Loading...</h1>}
        {posts.error && <h1>{posts.error}</h1>}
        {posts.data.length &&
          posts.data.map((post, index) => <Post key={index} data={post} />)}
        {/* <Post type="notice" />
        <Post />
        <Post />
        <Post /> */}
      </div>
      <div className="homepage-right">
        <UserTeams />
      </div>
    </div>
  );
};

export default Home;
