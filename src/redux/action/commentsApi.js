import axios from "axios";
import {axiosInstance} from "../../server/host";

export function allCommentsByNews(id) {
    const req = axiosInstance.get("/comments/"+{id}+"/all")
        .then(res => res.data);

    return {
        type:"GET_POSTS",
        payload: req
    }
}
// export function getCommets() {
//     const req = axiosInstance.get("/comments/"+{id}+"/all")
//         .then(res => res.data);
//
//     return {
//         type:"GET_POSTS",
//         payload: req
//     }
// }
// export function getPost(id) {
//     const req = axiosInstance.get("/admin/news/"+id)
//         .then(res => res.data);
//     return {
//         type:"GET_POST",
//         payload: req
//     }
// }