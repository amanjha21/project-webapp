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
      <img src={imgUrl} className="circle" />
      <div className="single-container">
        <span>{name}</span>
        <span>{time} ago</span>
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
