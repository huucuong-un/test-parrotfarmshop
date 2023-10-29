import axiosClient from './AxiosClient';

const RoleAPI = {
    getRoles() {
        const url = '/role';
        return axiosClient.get(url);
    },

    addRole(data) {
        const url = '/role';
        return axiosClient.post(url, data);
    },

    updateRole(data, roleId) {
        const url = `/role/${roleId}`;
        return axiosClient.put(url, data);
    },
};

export default RoleAPI;
