import Comment from "./Comment/Comment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCommentsByPostId } from "../../redux/post";
import { SERVER_ENDPOINT } from "../../helpers/Constants";
import axios from "axios";
import { authHeader } from "../../helpers/authHeader";
import { useNavigate } from "react-router-dom";
const CommentSection = ({ defaultTextLength, currentUser, postId, type }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const commentsDataArray = useSelector((state) => {
    return state.postComments.data.filter(
      (comment) => comment.postId === postId
    );
  });
  const commentsData = commentsDataArray[0];
  let commentsArray = [];
  if (commentsData) {
    commentsArray = [...commentsData.user_comments, ...commentsData.comments];
  }
  const isLoading = useSelector((state) => state.postComments.isLoading);
  const error = useSelector((state) => state.postComments.error);
  const [commentLimit, setCommentLimit] = useState(1);
  const handleViewMore = () => {
    setCommentLimit((oldLimit) => oldLimit + 1);
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (!e.target.value) return;
      const userId = JSON.parse(localStorage.getItem("currentUserId"));
      if (!userId) {
        navigate("/login");
        return;
      }
      const data = new FormData();
      data.append("comment", e.target.value);
      data.append("postId", postId);
      //send comment to server
      axios
        .post(`${SERVER_ENDPOINT}/${type}/reaction/`, data, {
          headers: { "Content-Type": "multipart/form-data", ...authHeader() },
        })
        .then((res) => {
          console.log(res.data);
          e.target.value = "";
        })
        .catch((err) => {
          console.log(err?.response?.data);
        });
    }
  };
  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem("currentUserId"));
    if (!commentsData && userId) {
      dispatch(getCommentsByPostId(postId));
    }
  }, []);
  return (
    <div>
      <div className="comment-section">
        {isLoading && <h1>Loading...</h1>}
        {error && <h1>{error}</h1>}
        {commentsData && !isLoading && !error && commentsArray.length === 0 && (
          <h1>no comments</h1>
        )}
        {commentsData &&
          commentsArray.map((comment, i) => {
            if (i < commentLimit) {
              return (
                <Comment
                  key={i}
                  name={comment.user.name}
                  text={comment.comment}
                  time={comment.createdAt}
                  imgUrl={comment.user.imageUrl}
                  defaultTextLength={defaultTextLength}
                />
              );
            }
          })}
      </div>
      {commentsData && commentLimit < commentsArray.length && (
        <p id="viewmore" onClick={handleViewMore}>
          View More
        </p>
      )}
      <div className="comment-input">
        <img className="circle" src={currentUser.imageUrl} alt="user profile" />
        <textarea
          className="rounded-corner"
          onKeyPress={handleKeyPress}
          placeholder="Add comment..."
        />
      </div>
    </div>
  );
};

export default CommentSection;
