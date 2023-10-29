import axios from 'axios';
import axiosClinet from './AxiosClient';

const FeedbackAPI = {
    getAll(params) {
        const url = '/feedback/find-all-by-species-id-and-belong-to-or-rating-or-color-id';
        return axiosClinet.get(url, { params });
    },
    getAllFeedbackSystem(params) {
        const url = '/feedback/admin/search_sort';
        return axiosClinet.get(url, { params });
    },

    create(data) {
        const url = `/feedback`;
        return axiosClinet.post(url, data);
    },
    checkFeedbacked(params) {
        const url = '/feedback/count-by-orderId';
        return axiosClinet.get(url, { params });
    },
    countReview(params) {
        const url = '/feedback/count-by-species-id-or-species-color-id-and-rating';
        return axiosClinet.get(url, { params });
    },
    changeStatus(id) {
        const url = `/feedback/admin/change-status/${id}`;
        return axiosClinet.put(url);
    },
};

export default FeedbackAPI;
