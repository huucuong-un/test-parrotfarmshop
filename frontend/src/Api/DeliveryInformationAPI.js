import axiosClient from './AxiosClient';

const DeliveryInformation = {
    getAll(customerid, config) {
        const url = `/delivery-information/${customerid}`;
        return axiosClient.get(url, config);
    },

    addNewDeliveryInfo(data, config) {
        const url = `/delivery-information`;
        return axiosClient.post(url, data, config);
    },

    updateDeliveryInfo(data, config) {
        const url = `/delivery-information`;
        return axiosClient.put(
            url,
            {
                id: data.id,
                name: data.name,
                phoneNumber: data.phoneNumber,
                address: data.address,
                status: data.status,
                userId: data.userId,
                pickingStatus: data.pickingStatus,
            },
            config,
        );
    },

    getDeliveryInfoWithTruePickingStatusByCustomerId(customerid, config) {
        const url = `/delivery-information/picking-status/${customerid}`;
        return axiosClient.get(url, config);
    },

    updatePickingStatus(data) {
        const url = `/delivery-information/update-picking-status`;
        return axiosClient.put(url, data);
    },

    getOneById(id) {
        const url = `/delivery-information/admin/find-one-by-id/${id}`;
        return axiosClient.get(url);
    },
};

export default DeliveryInformation;
