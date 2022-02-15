import Comment from "./Comment/Comment";
import { useState } from "react";
const CommentSection = ({ defaultTextLength, comments, setComments }) => {
  const [commentLimit, setCommentLimit] = useState(1);
  const handleViewMore = () => {
    setCommentLimit(commentLimit + 1);
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (!e.target.value) return;
      setComments([
        ...comments,
        {
          name: "Current User",
          text: e.target.value,
          createdAt: "1s",
          userImageUrl:
            "http://cp91279.biography.com/1000509261001/1000509261001_1822909398001_BIO-Biography-29-Innovators-Mark-Zuckerberg-115956-SF.jpg",
        },
      ]);
      setCommentLimit(commentLimit + 1);
      e.target.value = "";
    }
  };
  return (
    <div>
      <div className="comment-section">
        {comments.map((comment, i) => {
          if (i < commentLimit) {
            return (
              <Comment
                key={i}
                name={comment.name}
                text={comment.text}
                time={comment.createdAt}
                imgUrl={comment.userImageUrl}
                defaultTextLength={defaultTextLength}
              />
            );
          } else {
            return;
          }
        })}
      </div>
      {commentLimit < comments.length && (
        <p id="viewmore" onClick={handleViewMore}>
          View More
        </p>
      )}
      <div className="input">
        <img className="circle" />
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
