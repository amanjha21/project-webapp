import { useState } from "react";
const Comment = ({ name, time, text, imgUrl, defaultTextLength }) => {
  const [message, setMessage] = useState(text.slice(0, 150));
  const handleViewMore = () => {
    setMessage(text);
  };
  const handleViewLess = () => {
    setMessage(text.slice(0, defaultTextLength));
  };

  return (
    <div className="single-comment">
      <div className="comment-user">
        <img src={imgUrl} className="circle" />
        <div className="comment-user-details">
          <div className="comment-user-name">{name}</div>
          <div className="comment-time">{time} ago</div>
        </div>
      </div>
      <div className="single-container">
        <div>
          {message}
          {text.length > defaultTextLength &&
            message.length <= defaultTextLength && (
              <span id="viewmore" onClick={handleViewMore}>
                . . . View More
              </span>
            )}
          {message.length > defaultTextLength && (
            <span id="viewmore" onClick={handleViewLess}>
              View Less
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Comment;
