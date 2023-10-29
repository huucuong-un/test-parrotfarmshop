import axios from 'axios';

import axiosClient from './AxiosClient';

const UserAPI = {
    getUserById(id) {
        const url = `/user/get-user-by-id?id=${id}`;
        return axiosClient.get(url);
    },

    updateUserProfile(data) {
        const url = `/user/update-profile`;
        return axiosClient.put(url, data);
    },
};
export default UserAPI;
