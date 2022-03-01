import "./Post.css";
import { useState } from "react";
import ReactionBar from "./ReactionBar";
import MediaCarousel from "./MediaCarousel";
import Popup from "../Popup";
import UserReaction from "./UserReaction/UserReaction";
import PostOptions from "./PostOptions";

const Post = ({ type = "post" }) => {
  let postData = {
    _id: "621d07fd0ef9bb6d9855fd84",
    content: `this is my 2nd post Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt amet fugiat tempore, voluptates architecto molestias aliquam necessitatibus quo ea deleniti, rerum at autem officiis fuga. Praesentium molestiae dicta hic consectetur.
    Molestias recusandae nesciunt sunt consequatur inventore, qui fugiat necessitatibus possimus, quam quos quisquam explicabo culpa officiis alias neque non aperiam dolor minus numquam ut reiciendis vel assumenda voluptas. Quidem, ut?
    Libero maxime tenetur iste impedit aut sunt sit sequi mollitia est nam adipisci debitis temporibus voluptas assumenda exercitationem cumque dolores sed consequuntur, qui labore odio officiis officia. Sunt, atque perspiciatis.
    Commodi architecto hic ut eos facilis vero dicta saepe? A illo qui minima molestias reiciendis ea culpa fuga officia tempora obcaecati. Fugit sit atque voluptatum numquam quod quia facilis iusto!
    Ipsam neque quo, explicabo sunt incidunt ratione odio, voluptatum obcaecati enim corporis adipisci ut eius inventore quasi, ex atque officiis aut placeat aliquid quas? Aliquid minus odit quia enim odio?
    Alias ratione numquam totam libero sunt dolor blanditiis? Magnam nostrum neque rerum eum deleniti quam debitis eos? Aspernatur minima ut quo ea sed dolorum corporis incidunt. Laboriosam repudiandae ex ducimus.
    Vero error nesciunt natus facilis ex earum aspernatur debitis, eligendi atque minima quibusdam neque facere beatae asperiores eaque architecto libero deleniti odit incidunt autem dignissimos sequi! Tempore dolore repudiandae iusto?
    Reprehenderit quia quae mollitia doloribus ut eius, possimus ullam minima consectetur expedita laboriosam rerum voluptatibus alias error pariatur est a quibusdam. Omnis officiis excepturi fugit, sint aliquam ut. Ut, voluptas!
    Eaque, amet. Itaque vero architecto dolores quisquam, deleniti excepturi magnam accusantium natus eaque rerum sed tempora adipisci unde eveniet vel aperiam inventore! Mollitia dolorum sed laborum, iusto quod sint aspernatur!
    Tempora officiis nihil enim aperiam sunt nulla quidem suscipit natus sit ullam ipsum ratione numquam ad, porro aliquid nemo dolorem nesciunt quam consectetur officia error, architecto repudiandae. Suscipit, quam ex.`,
    image_link: [
      "https://res.cloudinary.com/amanjha/image/upload/v1646069763/synoarx/user/62041a8360c7f0fb3032531d/post-images/i5f6cddaw3tc2ynwmqjg.jpg",
      "https://res.cloudinary.com/amanjha/image/upload/v1646069764/synoarx/user/62041a8360c7f0fb3032531d/post-images/xrivhdy9zhsyzrnyy1pz.jpg",
    ],
    createdAt: "2022-02-28T17:36:03.614Z",
    updatedAt: "2022-02-28T17:36:03.614Z",
    like: 1,
    dislike: 1,
    user: {
      _id: "62041a8360c7f0fb3032531d",
      name: "Vaibhav Kedia",
      imageUrl:
        "https://res.cloudinary.com/amanjha/image/upload/v1646067254/synoarx/user/62041a8360c7f0fb3032531d/loiekgcdfstfzblxzn50.jpg",
    },
    user_reaction: {
      type: "like",
      createdAt: "2022-03-01T14:02:23.516Z",
    },
  };
  const defaultTextLength = 150;
  const defaultNotFoundImgProfile =
    "https://heatherchristenaschmidt.files.wordpress.com/2011/09/facebook_no_profile_pic2-jpg.gif";
  const currentUser = {
    name: "Aman Jha",
    imageUrl: defaultNotFoundImgProfile,
  };
  let postUser = postData.user;
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
  const text = postData.content;
  const images = postData.image_link.map((link) => {
    return { original: link };
  });

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
  return (
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
          <p>3h ago</p>
        </div>
        <PostOptions text={text} images={images} />
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
      <div className="post-image">
        <MediaCarousel images={images} />
      </div>
      <ReactionBar
        defaultTextLength={defaultTextLength}
        viewReactionHandler={viewReactionHandler}
        currentUser={currentUser}
        like={postData.like}
        dislike={postData.dislike}
        userReaction={postData.user_reaction.type}
      />
      <Popup visible={viewReactions} setVisible={setViewReactions}>
        <UserReaction reactions={reactions} setReactions={setReactions} />
      </Popup>
    </div>
  );
};

export default Post;
