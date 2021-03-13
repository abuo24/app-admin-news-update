export default function (state={}, action) {
    switch (action.type) {
        case "GET_COMMENTS":
            return {...state, file: action.payload}
        case "CREATE_COMMENT":
            return {...state, file: action.payload}
        default:
            return state;
    }
}