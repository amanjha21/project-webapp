import "./Post.css";
import { useState } from "react";
import ReactionBar from "./ReactionBar";
import MediaCarousel from "./MediaCarousel";
import Popup from "../Popup";
import UserReaction from "./UserReaction/UserReaction";
import PostOptions from "./PostOptions";

const Post = () => {
  const defaultTextLength = 150;
  const defaultNotFoundImgProfile =
    "https://heatherchristenaschmidt.files.wordpress.com/2011/09/facebook_no_profile_pic2-jpg.gif";
  const currentUser = {
    username: "Aman Jha",
    imgUrl: defaultNotFoundImgProfile,
  };
  const text = `
    Omg it's snowing outside! Lorem ipsum dolor sit amet, consectetur
    adipisicing elit. Eaque unde corporis numquam aspernatur, reiciendis
    similique consequatur tenetur incidunt quae eos necessitatibus.
    Recusandae non pariatur necessitatibus aspernatur atque accusamus ad
    tenetur. Lorem ipsum dolor, sit amet consectetur adipisicing elit.
    Assumenda beatae fuga architecto repudiandae minus, non magni aut
    repellendus enim ut eligendi asperiores excepturi nihil repellat dolore,
    doloremque cupiditate unde eveniet. Porro vel eius reiciendis pariatur
    dignissimos, illum earum culpa distinctio suscipit iste repellat odio
    laborum consectetur omnis optio deserunt quasi tempora ipsa similique
    quam repellendus, quisquam, consequuntur beatae. Facere, error? Eum
    facilis dolor consectetur error voluptatem, dicta eos ea dolorum enim
    libero omnis incidunt! Nesciunt nostrum incidunt dolor consequatur, sunt
    est tenetur ex cupiditate quos temporibus cum iusto! Vitae, suscipit!
    epellendus sequi quos dolore facilis voluptatum amet atque.
  `;
  const images = [
    {
      original: "https://source.unsplash.com/random/1920x1080",
      thumbnail: "https://picsum.photos/id/1018/250/150/",
    },
    {
      original: "https://surce.unsplash.com/random/600x600",
      thumbnail: "https://picsum.photos/id/1018/250/150/",
      height: "500px",
      width: "500px",
    },

    {
      original: "https://source.unsplash.com/random/100x600",
      thumbnail: "https://picsum.photos/id/1018/250/150/",
    },
    {
      original: "https://source.unsplash.com/random/600x100",
      thumbnail: "https://picsum.photos/id/1018/250/150/",
    },
    {
      original: "https://source.unsplash.com/random/600x600",
      thumbnail: "https://picsum.photos/id/1018/250/150/",
    },
    {
      original: "https://picsum.photos/id/1015/1000/600/",
      thumbnail: "https://picsum.photos/id/1015/250/150/",
    },
    {
      original: "https://picsum.photos/id/1019/1000/600/",
      thumbnail: "https://picsum.photos/id/1019/250/150/",
    },
  ];
  const [comments, setComments] = useState([
    {
      name: "Aman",
      text: `
      Omg it's snowing outside! Lorem ipsum dolor sit amet, consectetur
      adipisicing elit. Eaque unde corporis numquam aspernatur, reiciendis
      similique consequatur tenetur incidunt quae eos necessitatibus.
      Recusandae non pariatur necessitatibus aspernatur atque accusamus ad
      tenetur. Lorem ipsum dolor, sit amet consectetur adipisicing elit.
      Assumenda beatae fuga architecto repudiandae minus, non magni aut
      repellendus enim ut eligendi asperiores excepturi nihil repellat dolore,
      doloremque cupiditate unde eveniet. Porro vel eius reiciendis pariatur
      dignissimos, illum earum culpa distinctio suscipit iste repellat odio
      laborum consectetur omnis optio deserunt quasi tempora ipsa similique
      quam repellendus, quisquam, consequuntur beatae. Facere, error? Eum
      facilis dolor consectetur error voluptatem, dicta eos ea dolorum enim
      libero omnis incidunt! Nesciunt nostrum incidunt dolor consequatur, sunt
      est tenetur ex cupiditate quos temporibus cum iusto! Vitae, suscipit!
      epellendus sequi quos dolore facilis voluptatum amet atque.
    `,
      createdAt: "3h",
      userImageUrl:
        "http://cp91279.biography.com/1000509261001/1000509261001_1822909398001_BIO-Biography-29-Innovators-Mark-Zuckerberg-115956-SF.jpg",
    },
    {
      name: "User 2",
      text: "this is 2st comment",
      createdAt: "2h",
      userImageUrl:
        "http://cp91279.biography.com/1000509261001/1000509261001_1822909398001_BIO-Biography-29-Innovators-Mark-Zuckerberg-115956-SF.jpg",
    },
    {
      name: "User 3",
      text: "this is 3st comment",
      createdAt: "1min",
      userImageUrl:
        "http://cp91279.biography.com/1000509261001/1000509261001_1822909398001_BIO-Biography-29-Innovators-Mark-Zuckerberg-115956-SF.jpg",
    },
  ]);
  const [reactions, setReactions] = useState([
    {
      name: "Aman",
      createdAt: "3h",
      type: "like",
      userImageUrl:
        "http://cp91279.biography.com/1000509261001/1000509261001_1822909398001_BIO-Biography-29-Innovators-Mark-Zuckerberg-115956-SF.jpg",
    },
    {
      name: "User 2",
      createdAt: "2h",
      type: "like",
      userImageUrl:
        "http://cp91279.biography.com/1000509261001/1000509261001_1822909398001_BIO-Biography-29-Innovators-Mark-Zuckerberg-115956-SF.jpg",
    },
    {
      name: "User 3",
      createdAt: "1min",
      type: "dislike",
      userImageUrl:
        "http://cp91279.biography.com/1000509261001/1000509261001_1822909398001_BIO-Biography-29-Innovators-Mark-Zuckerberg-115956-SF.jpg",
    },
    {
      name: "Aman",
      createdAt: "3h",
      type: "like",
      userImageUrl:
        "http://cp91279.biography.com/1000509261001/1000509261001_1822909398001_BIO-Biography-29-Innovators-Mark-Zuckerberg-115956-SF.jpg",
    },
    {
      name: "User 2",
      createdAt: "2h",
      type: "like",
      userImageUrl:
        "http://cp91279.biography.com/1000509261001/1000509261001_1822909398001_BIO-Biography-29-Innovators-Mark-Zuckerberg-115956-SF.jpg",
    },
    {
      name: "User 3",
      createdAt: "1min",
      type: "dislike",
      userImageUrl:
        "http://cp91279.biography.com/1000509261001/1000509261001_1822909398001_BIO-Biography-29-Innovators-Mark-Zuckerberg-115956-SF.jpg",
    },
    {
      name: "Aman",
      createdAt: "3h",
      type: "like",
      userImageUrl:
        "http://cp91279.biography.com/1000509261001/1000509261001_1822909398001_BIO-Biography-29-Innovators-Mark-Zuckerberg-115956-SF.jpg",
    },
    {
      name: "User 2",
      createdAt: "2h",
      type: "like",
      userImageUrl:
        "http://cp91279.biography.com/1000509261001/1000509261001_1822909398001_BIO-Biography-29-Innovators-Mark-Zuckerberg-115956-SF.jpg",
    },
    {
      name: "User 3",
      createdAt: "1min",
      type: "dislike",
      userImageUrl:
        "http://cp91279.biography.com/1000509261001/1000509261001_1822909398001_BIO-Biography-29-Innovators-Mark-Zuckerberg-115956-SF.jpg",
    },
    {
      name: "Aman",
      createdAt: "3h",
      type: "like",
      userImageUrl:
        "http://cp91279.biography.com/1000509261001/1000509261001_1822909398001_BIO-Biography-29-Innovators-Mark-Zuckerberg-115956-SF.jpg",
    },
    {
      name: "User 2",
      createdAt: "2h",
      type: "like",
      userImageUrl:
        "http://cp91279.biography.com/1000509261001/1000509261001_1822909398001_BIO-Biography-29-Innovators-Mark-Zuckerberg-115956-SF.jpg",
    },
    {
      name: "User 3",
      createdAt: "1min",
      type: "dislike",
      userImageUrl:
        "http://cp91279.biography.com/1000509261001/1000509261001_1822909398001_BIO-Biography-29-Innovators-Mark-Zuckerberg-115956-SF.jpg",
    },
    {
      name: "Aman",
      createdAt: "3h",
      type: "like",
      userImageUrl:
        "http://cp91279.biography.com/1000509261001/1000509261001_1822909398001_BIO-Biography-29-Innovators-Mark-Zuckerberg-115956-SF.jpg",
    },
    {
      name: "User 2",
      createdAt: "2h",
      type: "like",
      userImageUrl:
        "http://cp91279.biography.com/1000509261001/1000509261001_1822909398001_BIO-Biography-29-Innovators-Mark-Zuckerberg-115956-SF.jpg",
    },
    {
      name: "User 3",
      createdAt: "1min",
      type: "dislike",
      userImageUrl:
        "http://cp91279.biography.com/1000509261001/1000509261001_1822909398001_BIO-Biography-29-Innovators-Mark-Zuckerberg-115956-SF.jpg",
    },
  ]);
  const [message, setMessage] = useState(text.slice(0, 150));
  const handleViewMore = () => {
    setMessage(text);
  };
  const handleViewLess = () => {
    setMessage(text.slice(0, defaultTextLength));
  };
  const [viewReactions, setViewReactions] = useState(false);
  return (
    <div className="post-container rounded-corner">
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
        <PostOptions postText={text} imgUrl={images} />
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
        comments={comments}
        setComments={setComments}
        setViewReactions={setViewReactions}
        currentUser={currentUser}
      />
      <Popup visible={viewReactions} setVisible={setViewReactions}>
        <UserReaction reactions={reactions} setReactions={setReactions} />
      </Popup>
    </div>
  );
};

export default Post;
