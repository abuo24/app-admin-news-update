import {axiosInstance} from "../../server/host";

export function getAllFiles(page = 0) {
    const req = axiosInstance.get("/files/files?page="+page)
        .then(res => res.data);

    return {
        type: "GET_FILES",
        payload: req
    }
}