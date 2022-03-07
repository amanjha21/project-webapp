import { MdThumbUp, MdThumbDown, MdChatBubble, MdShare } from "react-icons/md";
import CommentSection from "./CommentSection";
import { useState } from "react";
import { SERVER_ENDPOINT } from "../../helpers/Constants";
import axios from "axios";
import { authHeader } from "../../helpers/authHeader";
import { useNavigate } from "react-router-dom";
const ReactionBar = ({
  defaultTextLength,
  viewReactionHandler,
  currentUser,
  like,
  dislike,
  userReaction,
  postId,
  type,
}) => {
  const navigate = useNavigate();
  const [showComments, setShowComments] = useState(false);
  let userLiked = userReaction === "like";
  let userDisiked = userReaction === "dislike";
  const [liked, setLiked] = useState(userLiked);
  const [disliked, setDisliked] = useState(userDisiked);
  const commentClickHandler = () => {
    //show loading animation
    //show comments
    setShowComments(!showComments);
  };
  const likeClickHandler = () => {
    const userId = JSON.parse(localStorage.getItem("currentUserId"));
    if (!userId) {
      navigate("/login");
      return;
    }
    setLiked(!liked);
    if (disliked) setDisliked(false);
    const data = new FormData();
    data.append("type", "like");
    data.append("postId", postId);
    //send like to server
    axios
      .post(`${SERVER_ENDPOINT}/${type}/reaction/update`, data, {
        headers: { "Content-Type": "multipart/form-data", ...authHeader() },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err?.response?.data);
      });
  };
  const dislikeClickHandler = () => {
    const userId = JSON.parse(localStorage.getItem("currentUserId"));
    if (!userId) {
      navigate("/login");
      return;
    }
    setDisliked(!disliked);
    if (liked) setLiked(false);
    const data = new FormData();
    data.append("type", "dislike");
    data.append("postId", postId);
    //send like to server
    axios
      .post(`${SERVER_ENDPOINT}/${type}/reaction/update`, data, {
        headers: { "Content-Type": "multipart/form-data", ...authHeader() },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err?.response?.data);
      });
  };

  return (
    <>
      <p className="reaction-count" onClick={viewReactionHandler}>
        <span>{like}</span>
        <MdThumbUp />
        <span>{dislike}</span>
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
          postId={postId}
          type={type}
          currentUser={currentUser}
          defaultTextLength={defaultTextLength}
        />
      )}
    </>
  );
};

export default ReactionBar;
