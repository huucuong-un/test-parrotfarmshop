import axiosClinet from './AxiosClient';

const VnpayAPI = {
    add(data) {
        const url = `/vnpay/payment`;
        return axiosClinet.post(url, data);
    },
};

export default VnpayAPI;
