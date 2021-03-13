import {axiosInstanceAdmin, host} from "../../server/host";
import axios from "axios";
const config = {
    headers: {
        'content-type': 'multipart/form-data',
        "Authorization": "Bearer "+localStorage.getItem("token")
    }
}
export const postsApi = {

    createComment: (newsid, data) => {
        return axios.post(`${host}/comments/${newsid}`, {
                author: "Admin",
                authorMail: "mryediniofficial9924@gmail.com",
                comments_id: data.comments_id === "" ? null : data.comments_id,
                message: data.message
            }
        )
    },
    addPost: (data) => {
        return axiosInstanceAdmin.post(`${host}/admin/news/add`, data,config
        )
    },
    addImg: (data) => {
        return axiosInstanceAdmin.post(`${host}/admin/news/upload`, data,config
        )
    }
};