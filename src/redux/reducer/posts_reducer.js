import {GET_POSTS_BY_VIEWS} from "../actionTypes";

export default function (state = {}, action) {
    switch (action.type) {
        case GET_POSTS_BY_VIEWS:
            return {...state, most_views: action.payload}
        case "GET_POSTS":
            return {...state, posts: action.payload}
        case "GET_POST":
            return {...state, post: action.payload}
        case "GET_MOST_POSTS":
            return {...state, popular_posts: action.payload}

        default:
            return state;
    }
}