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
  const [comments, setComments] = useState([]);
  const commentClickHandler = () => {
    //show loading animation
    //load comments
    setComments([
      {
        comments: [
          {
            _id: "621d087a0ef9bb6d9855fd8f",
            comment: "Awesome",
            createdAt: "2022-02-28T17:38:02.428Z",
            user: {
              _id: "62041a8360c7f0fb3032531d",
              name: "Vaibhav Kedia",
              imageUrl:
                "https://res.cloudinary.com/amanjha/image/upload/v1646067254/synoarx/user/62041a8360c7f0fb3032531d/loiekgcdfstfzblxzn50.jpg",
            },
          },
        ],
        user_comments: [
          {
            _id: "621e1b072490a77ba4d49781",
            comment: "this a check comment",
            createdAt: "2022-03-01T13:09:27.837Z",
            user: {
              _id: "621cf4fbbed10fdb469adfc0",
              name: "Aman Jha",
              imageUrl:
                "https://res.cloudinary.com/amanjha/image/upload/v1646067092/synoarx/user/621cf4fbbed10fdb469adfc0/qkbosv9sst4v0wbdlckb.jpg",
            },
          },
        ],
      },
    ]);
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
          comments={comments}
          defaultTextLength={defaultTextLength}
        />
      )}
    </>
  );
};

export default ReactionBar;
