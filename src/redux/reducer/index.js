import {combineReducers} from "redux";
import post_reducer from "./posts_reducer";
import category_reducer from "./category_reducer";
import comments_reducer from "./comments_reducer";
import user_reducer from "./user_reducer";
import short_post_reducer from "./short_post_reducer";
import tags_reducer from "./tags_reducer";
import message_reducer from "./message_reducer";
import auth_reducer from "./auth_reducer";
import toggle_reducer from "./toggle_reducer";
import langReducer from "./langReducer";
import videos_reducer from "./videos_reducer";
import files_reducer from "./files_reducer";

const rootReducer = combineReducers({
    post_reducer,
    comments_reducer,
    category_reducer,
    // user_reducer,
    short_post_reducer,
    tags_reducer,
    message_reducer,
    auth_reducer,
    toggle_reducer,
    langReducer,
    videos_reducer,
    files_reducer
});
export default rootReducer;