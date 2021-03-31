import {axiosInstance} from "../../server/host";


export function counts() {
    const req= axiosInstance.get("/admin/social/one").then(res =>res.data);

    return {
        type: "GET_COUNTS",
        payload: req
    }
}