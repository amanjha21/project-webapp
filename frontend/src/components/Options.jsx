import { useState } from "react";
import "./Options.css";
import { BiDotsVerticalRounded } from "react-icons/bi";
import SingleOption from "./Post/PostOption/SingleOption";
const Options = ({ children }) => {
  const [postOptionsVisible, setPostOptionsVisible] = useState(false);

  return (
    <>
      <div
        className="three-dot-options"
        tabIndex="1"
        onBlur={() => setPostOptionsVisible(false)}
      >
        <SingleOption postOptionsVisible={postOptionsVisible}>
          {children}
        </SingleOption>
        <BiDotsVerticalRounded
          className="three-dot-option-toggle"
          onClick={() => setPostOptionsVisible((prevState) => !prevState)}
        />
      </div>
    </>
  );
};

export default Options;
