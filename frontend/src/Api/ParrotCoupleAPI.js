import axiosClinet from './AxiosClient';

const ParrotCoupleAPI = {
    // getAll(params) {
    //     const url = '/parrot';
    //     return axiosClinet.get(url, { params });
    // },

    add(data) {
        const url = `/parrot-couple`;
        return axiosClinet.post(url, data);
    },
};

export default ParrotCoupleAPI;
