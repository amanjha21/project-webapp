import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./post/features/postSlice";
import postCommentReducer from "./post/features/commentSlice";
import postReactionReducer from "./post/features/reactionSlice";
import noticeReducer from "./notice/features/noticeSlice";
import noticeCommentReducer from "./notice/features/commentSlice";
import noticeReactionReducer from "./notice/features/reactionSlice";
import currentUserReducer from "./userTeams/features/currentUserSlice";
import userProfileReducer from "./UserProfile/features/userSlice";
import teamProfileReducer from "./TeamProfile/features/teamSlice";
import userPostReducer from "./UserPost/features/userPostsSlice";
import teamNoticeReducer from "./TeamNotice/features/teamNoticesSlice";

const store = configureStore({
  reducer: {
    posts: postReducer,
    postComments: postCommentReducer,
    postReactions: postReactionReducer,
    notices: noticeReducer,
    noticeComments: noticeCommentReducer,
    noticeReactions: noticeReactionReducer,
    currentUser: currentUserReducer,
    userProfile: userProfileReducer,
    teamProfile: teamProfileReducer,
    userPosts: userPostReducer,
    teamNotices: teamNoticeReducer,
  },
});

export default store;
