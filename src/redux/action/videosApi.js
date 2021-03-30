import {axiosInstance, axiosInstanceAdmin} from "../../server/host";

export function getVideos(page=0,size=8) {
    const req = axiosInstance.get("/videonews/all?page="+page+"&size="+size)
        .then(res => res.data);

    return {
        type: "GET_VIDEONEWS",
        payload: req
    }
}