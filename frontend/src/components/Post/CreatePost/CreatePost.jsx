import { useEffect, useState } from "react";
import "./CreatePost.css";
import { MdPermMedia } from "react-icons/md";
import MediaCarousel from "../MediaCarousel";
const CreatePost = ({ postText = "", images = [], type = "update" }) => {
  const [newImageList, setNewImageList] = useState([""]);
  // console.log(newImageList);
  const [text, setText] = useState("");
  const onSubmitHandler = () => {
    console.log("submitted", text);
  };
  const imageInputChangeHandler = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    e.target.value = null;
    reader.onloadend = () => {
      let newImage = { original: reader.result, thumbnail: reader.result };
      let updatedImageList = [...newImageList, newImage];
      // console.log(newImageList, updatedImageList);
      setNewImageList(updatedImageList);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };
  useEffect(() => {
    setText(postText);
    setNewImageList(images);
    // console.log("ran", images, newImageList);
  }, []);
  // useEffect(() => {
  //   console.log("list changed", newImageList);
  // }, [newImageList]);

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
                    id={`post-image-select ${type}`}
                    onClick={() => console.log("hi")}
                    onChange={imageInputChangeHandler}
                    hidden
                  />
                  <label htmlFor={`post-image-select ${type}`}>
                    <MdPermMedia className="item" />
                  </label>
                </div>
              </div>
              {newImageList.length != 0 && (
                <div className="post-image">
                  <MediaCarousel images={newImageList} />
                </div>
              )}
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
