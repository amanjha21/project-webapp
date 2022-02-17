import { MdThumbUp, MdThumbDown } from "react-icons/md";
const SingleReaction = ({ imgUrl, name, time, type }) => {
  return (
    <div className="reaction-single">
      <div className="reaction-user">
        <img src={imgUrl} className="circle" />
        <div className="reaction-user-details">
          <div className="reaction-user-name">{name}</div>
          <div className="reaction-time">{time} ago</div>
        </div>
      </div>
      <div className="reaction-type rounded-corner">
        {type == "like" ? (
          <>
            <MdThumbUp />
            <span>{"Liked"}</span>
          </>
        ) : (
          <>
            <MdThumbDown />
            <span>{"Disliked"}</span>
          </>
        )}{" "}
      </div>
    </div>
  );
};

export default SingleReaction;
