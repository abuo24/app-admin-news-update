import {axiosInstance} from "../../server/host";

export function allPosts() {
    const req = axiosInstance.get("/admin/shortnews")
        .then(res => res.data);

    return {
        type:"GET_SHORT_POSTS",
        payload: req
    }
}
export function getPostByCategoryId(categoryid,page=0, size=8) {
    const req = axiosInstance.get("/admin/"+categoryid+"/shortnews?page="+page+"&size="+size)
        .then(res => res.data);
    return {
        type:"GET_SHORT_POST_BY_CATEGORIID",
        payload: req
    }
}