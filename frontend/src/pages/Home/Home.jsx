import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/Navbar/Navbar";
import CreatePost from "../../components/Post/CreatePost/CreatePost";
import Post from "../../components/Post/Post";
import UserTeams from "../../components/UserTeams/UserTeams";
import { getPosts } from "../../redux/post";
import { removePosts, setLoading } from "../../redux/post/features/postSlice";
import "./Home.css";

const Home = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const currentUser = useSelector((state) => state.currentUser.data);
  const [page, setPage] = useState(1);
  const defaultLimit = 1;
  const loadMoreHandler = () => {
    setPage((prev) => prev + 1);
  };
  const onScroll = () => {
    // if (
    //   10 + window.innerHeight + document.documentElement.scrollTop >=
    //     document.documentElement.offsetHeight &&
    //   !posts.isLoading
    // ) {
    //   // setPage((prev) => prev + 1);
    //   dispatch(setLoading(true));
    //   console.log(posts.isLoading, "ran");
    // }
  };
  useEffect(() => {
    dispatch(getPosts(page, defaultLimit));
  }, [page, currentUser]);
  useEffect(() => {
    // window.addEventListener("scroll", onScroll);
    //remove event listener cleanup
  }, []);
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
