import {axiosInstance, axiosInstanceAdmin, headers, host} from "../../server/host";

export function getMessage() {
    const req = axiosInstanceAdmin.get(`${host}/message/all`,{headers})
        .then(res => res.data);

    return {
        type: "GET_MESSAGE",
        payload: req
    }
}
