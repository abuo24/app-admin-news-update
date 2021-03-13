import axios from "axios";
import {headers, host} from "../../server/host";



export function getMe() {
    const req = axios.get(`${host}/auth/getme`,{headers})
        .then(res => res.data);

    return {
        type: "GET_USER",
        payload: req
    }
}

export function getMeByToken(headers) {
    const req = axios.get(`${host}/auth/getme`,{headers})
        .then(res => res.data);

    return {
        type: "GET_USER",
        payload: req
    }
}
