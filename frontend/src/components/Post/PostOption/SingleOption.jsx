import "./SingleOption.css";

const SingleOption = ({ postOptionsVisible, children }) => {
  return (
    <>
      <div
        className={`post-option-container rounded-corner ${
          postOptionsVisible ? "" : "hide-post-options"
        }`}
      >
        {children}
      </div>
    </>
  );
};

export default SingleOption;
