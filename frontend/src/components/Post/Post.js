import "./Post.css";
import { useState } from "react";
import ReactionBar from "./ReactionBar";
import MediaCarousel from "./MediaCarousel";
import Popup from "../Popup";
import UserReaction from "./UserReaction/UserReaction";
import PostOptions from "./PostOptions";

const Post = ({ type = "post", data }) => {
  let postData = data;
  const defaultTextLength = 150;
  const defaultNotFoundImgProfile =
    "https://heatherchristenaschmidt.files.wordpress.com/2011/09/facebook_no_profile_pic2-jpg.gif";
  const currentUser = {
    name: "Aman Jha",
    imageUrl: defaultNotFoundImgProfile,
  };
  let postUser = { ...postData?.user };
  if (!postUser.imageUrl) {
    postUser.imageUrl = defaultNotFoundImgProfile;
  }
  let noticeTeam;
  if (type === "notice")
    noticeTeam = {
      imgUrl:
        "https://heatherchristenaschmidt.files.wordpress.com/2011/09/facebook_no_profile_pic2-jpg.gif",
      name: "Team Name",
      user: "Aman 2",
    };
  const text = postData?.content || "";
  const images =
    postData?.image_link
      .filter((image) => image !== "")
      .map((link) => {
        return { original: link };
      }) || [];
  const [reactions, setReactions] = useState([]);
  const [message, setMessage] = useState(text.slice(0, 150));
  const handleViewMore = () => {
    setMessage(text);
  };
  const handleViewLess = () => {
    setMessage(text.slice(0, defaultTextLength));
  };
  const [viewReactions, setViewReactions] = useState(false);
  const viewReactionHandler = () => {
    //show loading
    //load reaction
    setReactions([
      {
        _id: "621d09530ef9bb6d9855fdb1",
        type: "like",
        createdAt: "2022-02-28T17:41:39.018Z",
        user: {
          _id: "62041a8360c7f0fb3032531d",
          name: "Vaibhav Kedia",
          imageUrl:
            "https://res.cloudinary.com/amanjha/image/upload/v1646067254/synoarx/user/62041a8360c7f0fb3032531d/loiekgcdfstfzblxzn50.jpg",
        },
      },
      {
        _id: "621d09530ef9bb6d9855fdb1",
        type: "dislike",
        createdAt: "2022-01-28T17:41:39.018Z",
        user: {
          _id: "621cf4fbbed10fdb469adfc0",
          name: "Aman Jha",
          imageUrl:
            "https://res.cloudinary.com/amanjha/image/upload/v1646067092/synoarx/user/621cf4fbbed10fdb469adfc0/qkbosv9sst4v0wbdlckb.jpg",
        },
      },
    ]);
    //show reactions
    setViewReactions(true);
  };

  const currentUserId = JSON.parse(localStorage.getItem("currentUserId")) || "";
  return (
    <>
      {postData && (
        <div className="post-container rounded-corner">
          <div className="creator">
            <img
              className="post-creator-image circle"
              alt="user profile"
              src={type === "post" ? postUser.imageUrl : noticeTeam.imgUrl}
            />
            <div className="post-user-details">
              <p>{type === "post" ? postUser.name : noticeTeam.name}</p>
              {type === "notice" && (
                <p className="notice-user">
                  <span className="create">{"created by:- "}</span>
                  <span className="name">{noticeTeam.user}</span>
                </p>
              )}
              <p>{postData.createdAt}</p>
            </div>
            {postUser._id === currentUserId && (
              <PostOptions
                text={text}
                images={images}
                postUserId={postUser._id}
                postId={postData._id}
              />
            )}
          </div>
          <p className="post-message">
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
          </p>
          {images.length > 0 && (
            <div className="post-image">
              <MediaCarousel images={images} />
            </div>
          )}
          <ReactionBar
            postId={postData._id}
            defaultTextLength={defaultTextLength}
            viewReactionHandler={viewReactionHandler}
            currentUser={currentUser}
            like={postData.like}
            dislike={postData.dislike}
            userReaction={postData.user_reaction?.type}
            type={type}
          />
          <Popup visible={viewReactions} setVisible={setViewReactions}>
            <UserReaction
              reactions={reactions}
              setReactions={setReactions}
              postId={postData._id}
            />
          </Popup>
        </div>
      )}
    </>
  );
};

export default Post;
