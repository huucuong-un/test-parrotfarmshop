import axios from 'axios';
import axiosClinet from './AxiosClient';

const FAQSAPI = {
    getAll(params) {
        const url = '/faqs';
        return axiosClinet.get(url, { params });
    },

    add(data) {
        const url = `/faqs`;
        return axiosClinet.post(url, data);
    },

    changeStatus(id) {
        const url = `/faqs/${id}`;
        return axiosClinet.delete(url);
    },
};

export default FAQSAPI;
