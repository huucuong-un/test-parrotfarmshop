import axiosClient from './AxiosClient';

const RegisterAPI = {
    register(data, config) {
        const url = '/user/register';
        return axiosClient.post(url, data, config);
    },
};

export default RegisterAPI;
