import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/Navbar/Navbar";
import CreatePost from "../../components/Post/CreatePost/CreatePost";
import Post from "../../components/Post/Post";
import UserTeams from "../../components/UserTeams/UserTeams";
import { getPosts } from "../../redux/post";
import "./Home.css";
import { getCurrentUserById } from "../../redux/userTeams/getCurrentUserById";
const Home = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const [page, setPage] = useState(1);
  const defaultLimit = 5;
  const loadMoreHandler = () => {
    setPage((prev) => prev + 1);
  };
  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem("currentUserId"));
    dispatch(getCurrentUserById(userId));
    dispatch(getPosts(page, defaultLimit));
  }, [page]);
  return (
    <div className="homepage-grid-main">
      <div className="homepage-nav">
        <Navbar />
      </div>
      <div className="homepage-center">
        <CreatePost type="create" />
        {posts.isLoading && <h1>Loading...</h1>}
        {posts.data.length > 0 &&
          posts.data.map((post, index) => <Post key={index} data={post} />)}
        {!posts.isLoading && !posts.error && (
          <h1 onClick={loadMoreHandler}>load more</h1>
        )}
        {posts.isLoading && <h1>Loading...</h1>}
        {posts.error && <h1>{posts.error}</h1>}
      </div>
      <div className="homepage-right">
        <UserTeams />
      </div>
    </div>
  );
};

export default Home;
