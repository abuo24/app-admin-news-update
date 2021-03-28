import {axiosInstanceAdmin, host} from "../../server/host";
import axios from "axios";
const config = {
    headers: {
        'content-type': 'multipart/form-data',
        "Authorization": "Bearer "+localStorage.getItem("token")
    }
}

export const postsApi = {
    addPost: (data) => {
        return axiosInstanceAdmin.post('/news/add', data,config
        )
    },

    createComment: (newsid, data) => {
        return axios.post(`${host}/comments/${newsid}`, {
                author: "Admin",
                authorMail: "mryediniofficial9924@gmail.com",
                comments_id: data.comments_id === "" ? null : data.comments_id,
                message: data.message
            }
        )
    },
    editPost: (id,data) => {
        return axiosInstanceAdmin.put(`${host}/admin/news/${id}`, data,config)
    },
    addImg: (data) => {
        return axiosInstanceAdmin.post(`${host}/admin/news/upload`, data,config
        )
    },
    delete: (id) => {
        return axiosInstanceAdmin.delete(`${host}/admin/news/${id}`,config)
    }
};