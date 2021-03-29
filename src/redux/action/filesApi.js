import {axiosInstance} from "../../server/host";

export function getAllFiles() {
    const req = axiosInstance.get("/files/all")
        .then(res => res.data);

    return {
        type: "GET_FILES",
        payload: req
    }
}