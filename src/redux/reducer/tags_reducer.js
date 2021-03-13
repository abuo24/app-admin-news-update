export default function (state={}, action) {
    switch (action.type) {
        case "GET_TAGS":
            return {...state, tags: action.payload}
        // case "GET_POST_CATEGORY":
        //     return {...state, news: action.payload}
        default:
            return state;
    }
}