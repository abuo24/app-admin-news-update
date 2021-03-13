import { HttpRequestHub } from '../../HttpRequestHub';

export const updateUsers = (id, obj) => {
    const config = {
        method: 'PUT',
        url: `/api/admin/student/edit/${id}`,
        data: {}
    };
};
