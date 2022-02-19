import { useState } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import PostOption from "./PostOption/PostOption";
const PostOptions = () => {
  const [postOptionsVisible, setPostOptionsVisible] = useState(false);

  return (
    <>
      <div
        className="post-options"
        tabIndex="1"
        onBlur={() => setPostOptionsVisible(false)}
      >
        <PostOption postOptionsVisible={postOptionsVisible} />
        <BiDotsVerticalRounded
          className="post-option-toggle"
          onClick={() => setPostOptionsVisible((prevState) => !prevState)}
        />
      </div>
    </>
  );
};

export default PostOptions;