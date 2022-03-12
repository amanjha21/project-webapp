import Navbar from "../../components/Navbar/Navbar";
import Profile from "../../components/Profile/Profile";
import ProfileNavbar from "../../components/Profile/ProfileNavbar/ProfileNavbar";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { getUserById } from "../../redux/UserProfile";
import { getPostsByUserId } from "../../redux/UserPost";

const UserProfile = () => {
  const userId = "62041a8360c7f0fb3032531d";

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserById(userId));
    dispatch(getPostsByUserId(userId));
  }, []);

  const userArray = useSelector((state) => {
    return state.userProfile.data.filter((user) => user._id === userId);
  });

  const user = userArray[0];

  const posts = useSelector((state) => {
    return state.userPosts.data.filter((post) => post.user._id === userId);
  });

  return (
    <>
      {user && (
        <>
          <div className="user-profile-grid-container">
            <div className="navbar-grid">
              <Navbar />
            </div>
            <div className="profile-card-grid">
              <Profile
                profileImage={user.imageUrl}
                name={user.name}
                roll={user.email.split("@")[0]}
                organization={user.teams[0].name}
              />
            </div>
            <div className="profile-navbar-grid">
              <ProfileNavbar type="user" data={posts} about={user.teams} />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default UserProfile;
