import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReactionsByPostId } from "../../../redux/post";
import SingleReaction from "./SingleReaction";
import "./UserReaction.css";

const UserReaction = ({ postId }) => {
  const dispatch = useDispatch();

  const reactionsData = useSelector((state) => {
    return state.postReactions.data.filter(
      (reaction) => reaction.postId === postId
    );
  });

  const reactions = reactionsData[0]?.reactions;
  const isLoading = useSelector((state) => state.postReactions.isLoading);
  const error = useSelector((state) => state.postReactions.error);

  useEffect(() => {
    if (reactionsData.length === 0) {
      dispatch(getReactionsByPostId(postId));
    }
  }, []);
  return (
    <>
      <div className="user-reaction-container rounded-corner">
        {isLoading && <h1>Loading...</h1>}
        {error && <h1>{error}</h1>}
        {!isLoading && !error && reactions?.length === 0 && (
          <h1>no reactions</h1>
        )}
        {reactions &&
          reactions.map((reaction, i) => (
            <SingleReaction
              key={i}
              name={reaction.user.name}
              type={reaction.type}
              time={reaction.createdAt}
              imgUrl={reaction.user.imageUrl}
            />
          ))}
      </div>
    </>
  );
};

export default UserReaction;
