import "./profile.css";

const UserProfile = () => {
  return (
    <>
      <div className="wrapper">
        <div className="profile-card js-profile-card">
          <div className="profile-card__img">
            <img
              src="https://res.cloudinary.com/muhammederdem/image/upload/v1537638518/Ba%C5%9Fl%C4%B1ks%C4%B1z-1.jpg"
              alt="profile card"
            ></img>
          </div>

          <div className="profile-card__cnt js-profile-cnt">
            <div className="profile-card__name">Muhammed Erdem</div>
            <div className="profile-card__txt">
              <strong className="description">
                National Institute Of Technology Jamshedpur
              </strong>
            </div>

            <div className="profile-card-ctr">
              <button className="profile-card__button button--blue js-message-btn">
                New Post
              </button>
              <button className="profile-card__button button--orange">
                Edit Profile
              </button>
            </div>
          </div>

          {/* <div className="profile-card-message js-message">
            <form className="profile-card-form">
              <div className="profile-card-form__container">
                <textarea placeholder="Say something..."></textarea>
              </div>

              <div className="profile-card-form__bottom">
                <button className="profile-card__button button--blue js-message-close">
                  Send
                </button>

                <button className="profile-card__button button--gray js-message-close">
                  Cancel
                </button>
              </div>
            </form>

            <div className="profile-card__overlay js-message-close"></div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default UserProfile;
