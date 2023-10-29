import axiosClinet from './AxiosClient';

const NestUsageHistoryAPI = {
    add(data) {
        const url = `/nest-usage-history`;
        return axiosClinet.post(url, data);
    },
};

export default NestUsageHistoryAPI;
