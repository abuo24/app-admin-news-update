import {axiosInstance} from "../../server/host";

export function getMessage() {
    const req = axiosInstance.get("/message/all")
        .then(res => res.data);

    return {
        type: "GET_MESSAGE",
        payload: req
    }
}
