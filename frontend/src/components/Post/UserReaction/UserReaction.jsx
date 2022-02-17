import SingleReaction from './SingleReaction';
import './UserReaction.css'
const UserReaction = ({reactions,setReactions}) => {
  return (
    <>
      <div className="user-reaction-container rounded-corner">
      {reactions.map((reaction, i) => 
             (
              <SingleReaction
                key={i}
                name={reaction.name}
                type={reaction.type}
                time={reaction.createdAt}
                imgUrl={reaction.userImageUrl}
              />
            ))}
        
      </div>
    </>
  );
};

export default UserReaction;
