import Comment from "./Comment/Comment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCommentsByPostId } from "../../redux/post";
const CommentSection = ({ defaultTextLength, currentUser, postId }) => {
  const dispatch = useDispatch();
  const commentsDataArray = useSelector((state) => {
    return state.postComments.data.filter(
      (comment) => comment.postId === postId
    );
  });
  const commentsData = commentsDataArray[0];
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
      // const newComment = {
      //   name: currentUser.name,
      //   text: e.target.value,
      //   createdAt: "1s",
      //   userImageUrl: currentUser.imageUrl,
      // };
      // setComments((oldComments) => [newComment, ...oldComments]);
      e.target.value = "";
      // setCommentLimit((oldLimit) => oldLimit + 1);
    }
  };
  useEffect(() => {
    if (!commentsData) {
      dispatch(getCommentsByPostId(postId));
    }
  }, []);
  return (
    <div>
      <div className="comment-section">
        {isLoading && <h1>Loading...</h1>}
        {error && <h1>error</h1>}
        {commentsData &&
          commentsData.comments &&
          commentsData.comments.map((comment, i) => {
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
            } else {
              return <></>;
            }
          })}
        {commentsData &&
          commentsData.user_comments &&
          commentsData.user_comments.map((comment, i) => {
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
      {commentsData &&
        commentLimit <
          commentsData.comments.length + commentsData.user_comments.length && (
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
