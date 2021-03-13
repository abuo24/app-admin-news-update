export default function (state={}, action) {
    switch (action.type) {
        case "GET_SHORT_POSTS":
            return {...state, posts: action.payload}
        case "GET_SHORT_POST_BY_CATEGORIID":
            return {...state, posts_category: action.payload}
        default:
            return state;
    }
}