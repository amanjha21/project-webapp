import "./profile.css";
import ProfileNavbar from "./profileNavbar";

const UserProfile = () => {
  return (
    <>
      <div className="profile-card js-profile-card">
        <div className="profile-card__img">
          <img
            className="profile__img"
            src="https://res.cloudinary.com/muhammederdem/image/upload/v1537638518/Ba%C5%9Fl%C4%B1ks%C4%B1z-1.jpg"
            alt="profile card"
          ></img>
        </div>

        <div className="profile-card__cnt js-profile-cnt">
          <div className="profile-card__name">Rishab Singh</div>
          <div className="profile-card__txt">
            <strong className="profile__desc">
              National Institute Of Technology Jamshedpur
            </strong>
          </div>

          <div className="profile-card-ctr">
            {/* <button className="profile-card__button button--blue js-message-btn">
              New Post
            </button> */}
            <button className="profile-card__button button--orange">
              Edit Profile
            </button>
          </div>
        </div>
        <ProfileNavbar />
      </div>
    </>
  );
};

export default UserProfile;
