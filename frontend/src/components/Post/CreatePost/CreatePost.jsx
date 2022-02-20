import { useEffect, useState } from "react";
import "./CreatePost.css";
import { MdPermMedia } from "react-icons/md";
const CreatePost = ({ postText = "", imgUrl = [] }) => {
  const [text, setText] = useState("");
  function onSubmitHandler() {
    console.log("submitted", text);
  }
  useEffect(() => {
    setText(postText);
  }, []);
  return (
    <>
      <div className="create-post-wrapper">
        <div className="postContainer active">
          <div className="body">
            <div className="creator">
              <img
                className="post-creator-image circle"
                alt="user profile"
                src={
                  "http://cp91279.biography.com/1000509261001/1000509261001_1822909398001_BIO-Biography-29-Innovators-Mark-Zuckerberg-115956-SF.jpg"
                }
              />
              <div className="post-user-details">
                <p>Aman Jha</p>
                <p>3h ago</p>
              </div>
            </div>
            <textarea
              className="postContent"
              rows="4"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Write Something..."
            />
            <div className="actions">
              <div className="helpers">
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    name="chooseFile"
                    id="post-image-select"
                    onClick={() => console.log("hi")}
                    hidden
                  />
                  <label htmlFor="post-image-select">
                    <MdPermMedia className="item" />
                  </label>
                </div>
              </div>
              <button
                onClick={onSubmitHandler}
                className={`btn postButton ${text ? "" : "disabled"}`}
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatePost;
