import axiosClient from './AxiosClient';

const AccountAPI = {
    getAccounts() {
        const url = '/user';
        return axiosClient.get(url);
    },

    addAccount(data) {
        const url = '/user/register';
        return axiosClient.post(url, data);
    },
};

export default AccountAPI;
