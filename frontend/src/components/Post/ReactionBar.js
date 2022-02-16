import { MdThumbUp, MdThumbDown, MdChatBubble, MdShare } from "react-icons/md";
import CommentSection from "./CommentSection";
import { useState } from "react";
const ReactionBar = ({
  defaultTextLength,
  comments,
  setComments,
  setViewReactions,
}) => {
  const [showComments, setShowComments] = useState(false);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const commentClickHandler = () => {
    setShowComments(!showComments);
  };
  const likeClickHandler = () => {
    setLiked(!liked);
    if (disliked) setDisliked(false);
  };
  const dislikeClickHandler = () => {
    setDisliked(!disliked);
    if (liked) setLiked(false);
  };
  return (
    <>
      <p className="reaction-count" onClick={() => setViewReactions(true)}>
        <span>{"200"}</span>
        <MdThumbUp />
        <span>{"10"}</span>
        <MdThumbDown />
      </p>
      <div className="bar">
        {liked ? (
          <MdThumbUp
            className="action-button active-reaction"
            onClick={likeClickHandler}
          />
        ) : (
          <MdThumbUp className="action-button" onClick={likeClickHandler} />
        )}
        {disliked ? (
          <MdThumbDown
            className="action-button active-reaction"
            onClick={dislikeClickHandler}
          />
        ) : (
          <MdThumbDown
            className="action-button "
            onClick={dislikeClickHandler}
          />
        )}
        {showComments ? (
          <MdChatBubble
            className="action-button active-reaction"
            onClick={commentClickHandler}
          />
        ) : (
          <MdChatBubble
            className="action-button "
            onClick={commentClickHandler}
          />
        )}
        <MdShare className="action-button active-reaction " />
      </div>
      {showComments && (
        <CommentSection
          comments={comments}
          setComments={setComments}
          defaultTextLength={defaultTextLength}
        />
      )}
    </>
  );
};

export default ReactionBar;
