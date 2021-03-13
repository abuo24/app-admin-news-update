export default function (state={}, action) {
    switch (action.type) {
        case "GET_CATEGORY":
            return {...state, categories: action.payload}
        case "GET_POST_CATEGORY":
            return {...state, news: action.payload}
        default:
            return state;
    }
}