import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./post/features/postSlice";
import postCommentReducer from "./post/features/commentSlice";
import postReactionReducer from "./post/features/reactionSlice";
import currentUserReducer from "./userTeams/features/currentUserSlice";
import userProfileReducer from "./UserProfile/features/userSlice";
import teamProfileReducer from "./TeamProfile/features/teamSlice";

const store = configureStore({
  reducer: {
    posts: postReducer,
    postComments: postCommentReducer,
    postReactions: postReactionReducer,
    currentUser: currentUserReducer,
    userProfile: userProfileReducer,
    teamProfile: teamProfileReducer,
  },
});

export default store;
