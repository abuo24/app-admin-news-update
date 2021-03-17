import {axiosInstance} from "../../server/host";
import {GET_POSTS_BY_VIEWS} from "../actionTypes";

export function getCategories() {
    const req = axiosInstance.get("/admin/categories/all")
        .then(res => res.data);

    return {
        type: "GET_CATEGORY",
        payload: req
    }
}
export function getNewsByCategoryId(categoryid,page=0, size=4,) {
    const req = axiosInstance.get("/admin/"+categoryid+"/news?page="+page+"&size="+size)
        .then(res => res.data);

    return {
        type: "GET_POST_CATEGORY",
        payload: req
    }
}
export function getNewsByViewsCount() {
    const req = axiosInstance.get("/admin/news/views")
        .then(res => res.data);

    return {
        type: GET_POSTS_BY_VIEWS,
        payload: req
    }
}
export function getPost(id) {
    const req = axiosInstance.get("/admin/news/"+id)
        .then(res => res.data);
    return {
        type:"GET_POST",
        payload: req
    }
}
