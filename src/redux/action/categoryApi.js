import {axiosInstance} from "../../server/host";

export function getCategories() {
    const req = axiosInstance.get("/admin/categories/all")
        .then(res => res.data);

    return {
        type: "GET_CATEGORY",
        payload: req
    }
}

export function getNewsByCategoryId(categoryid, page=0) {
    const req = axiosInstance.get("/admin/"+categoryid+"/news?page="+page)
        .then(res => res.data);

    return {
        type: "GET_POST_CATEGORY",
        payload: req
    }
}