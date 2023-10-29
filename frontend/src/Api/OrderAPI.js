import axiosClinet from './AxiosClient';

const OrderAPI = {
    getAll(params) {
        const url = '/order/admin/order_management/list';
        return axiosClinet.get(url, { params });
    },

    searchByEmailAndPhone(params) {
        const url = '/order/admin/order_management/search';
        return axiosClinet.get(url, { params });
    },

    findAllByUserIdAndSearchSort(params) {
        const url = `/order/order-history-search-sort`;
        return axiosClinet.get(url, { params });
    },

    findAllByOrderId(id) {
        const url = `/orderdetail/findAllByOrderId/${id}`;
        return axiosClinet.get(url);
    },

    findAllOrderWithUser() {
        const url = '/order/find-all-order-with-user';
        return axiosClinet.post(url);
    },

    add(data) {
        const url = `/order/cart`;
        return axiosClinet.post(url, data);
    },
};

export default OrderAPI;
