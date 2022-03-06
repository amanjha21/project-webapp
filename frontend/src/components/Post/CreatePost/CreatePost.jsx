import { useEffect, useState } from "react";
import "./CreatePost.css";
import { MdPermMedia } from "react-icons/md";
import MediaCarousel from "../MediaCarousel";
import { toDataURL } from "../MediaCarousel";
import axios from "axios";
import {
  defaultUserNotFoundImgUrl,
  SERVER_ENDPOINT,
} from "../../../helpers/Constants";
import { authHeader } from "../../../helpers/authHeader";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../../redux/post";
import { useNavigate } from "react-router-dom";
const CreatePost = ({
  postText = "",
  images = [],
  type = "update",
  postId = "",
  onUpdateConfirm,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.currentUser.data) || [];
  const [newImageList, setNewImageList] = useState([""]);
  const [text, setText] = useState("");

  const onSubmitHandler = async () => {
    const userId = JSON.parse(localStorage.getItem("currentUserId"));
    if (!userId) {
      navigate("/login");
      return;
    }
    const data = new FormData();
    data.append("content", text);
    if (newImageList.length > 0) {
      await Promise.all(
        newImageList.map(async (image) => {
          const imageData = await toDataURL(image.original);
          const blob = imageData.blob;
          data.append("imageData", blob);
        })
      );
    } else if (type === "update") {
      data.append("deleteImageUrl", true);
    }

    if (type === "update") {
      data.append("postId", postId);
      axios
        .post(`${SERVER_ENDPOINT}/post/update`, data, {
          headers: { "Content-Type": "multipart/form-data", ...authHeader() },
        })
        .then((res) => {
          console.log(res.data);
          onUpdateConfirm();
          dispatch(getPosts());
        })
        .catch((err) => {
          console.log(err?.response?.data);
        });
    } else if (type === "create") {
      axios
        .post(`${SERVER_ENDPOINT}/post`, data, {
          headers: { "Content-Type": "multipart/form-data", ...authHeader() },
        })
        .then((res) => {
          console.log(res.data);
          setNewImageList("");
          setText("");
          dispatch(getPosts());
        })
        .catch((err) => {
          console.log(err?.response?.data);
        });
    }
  };
  const imageInputChangeHandler = (e) => {
    e.preventDefault();
    const userId = JSON.parse(localStorage.getItem("currentUserId"));
    if (!userId) {
      navigate("/login");
      return;
    }
    let reader = new FileReader();
    let file = e.target.files[0];
    console.log(file);
    e.target.value = null;
    reader.onloadend = () => {
      let newImage = { original: reader.result, thumbnail: reader.result };
      let updatedImageList = [newImage, ...newImageList];
      setNewImageList(updatedImageList);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };
  const removeCurrentImageFromList = (e, currentIndex = 0) => {
    e.preventDefault();
    let updatedImageList = newImageList.filter((img, i) => i !== currentIndex);
    setNewImageList(updatedImageList);
    console.log("remove current", e);
  };
  useEffect(() => {
    setText(postText);
    setNewImageList(images);
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
                src={currentUser.imageUrl || defaultUserNotFoundImgUrl}
              />
              <div className="post-user-details">
                <p>{currentUser.name || "-"}</p>
                <p>Just now</p>
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
                    onChange={imageInputChangeHandler}
                    hidden
                  />
                  <label htmlFor={`post-image-select ${type}`}>
                    <MdPermMedia className="item" />
                  </label>
                </div>
              </div>
              {newImageList.length != 0 && (
                <>
                  <div className="post-image create-post-image-preview">
                    <MediaCarousel images={newImageList} />
                  </div>
                  <button
                    onClick={removeCurrentImageFromList}
                    className={`deleteImageButton`}
                  >
                    Remove Image
                  </button>
                </>
              )}
              <button
                onClick={(e) => {
                  text && onSubmitHandler(e);
                }}
                className={`postButton ${text ? "" : "disabled"}`}
              >
                {type === "update" ? "Update Post" : "Post"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatePost;
