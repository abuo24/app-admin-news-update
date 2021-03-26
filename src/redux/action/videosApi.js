import {axiosInstance, axiosInstanceAdmin} from "../../server/host";

export function getVideos() {
    const req = axiosInstance.get("/videonews/all")
        .then(res => res.data);

    return {
        type: "GET_VIDEONEWS",
        payload: req
    }
}