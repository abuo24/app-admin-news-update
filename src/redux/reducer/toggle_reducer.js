export default function (state = {}, action) {
    switch (action.type) {
        case "TOGGLE":
            return {...state, toggle: action.payload}
        default:
            return state;
    }
}