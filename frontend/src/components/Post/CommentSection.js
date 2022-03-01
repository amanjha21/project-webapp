import Comment from "./Comment/Comment";
import { useState } from "react";
const CommentSection = ({ defaultTextLength, comments, currentUser }) => {
  const [commentLimit, setCommentLimit] = useState(1);
  const [commentsArray, setCommentsArray] = useState(
    comments[0].comments.concat(comments[0].user_comments)
  );
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
  return (
    <div>
      <div className="comment-section">
        {commentsArray.map((comment, i) => {
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
      {commentLimit < commentsArray.length && (
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
