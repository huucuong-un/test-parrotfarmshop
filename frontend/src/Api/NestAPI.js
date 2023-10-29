import axiosClinet from './AxiosClient';

const NestAPI = {
    //Nest
    getAllNest(params) {
        const url = '/parrot-egg-nest';
        return axiosClinet.get(url, { params });
    },
    changeStatusForNest(id) {
        const url = `/parrot-egg-nest/${id}`;
        return axiosClinet.delete(url);
    },

    addNest(data) {
        const url = `/parrot-egg-nest`;
        return axiosClinet.post(url, data);
    },
    findOneBySpeciesId(params) {
        const url = '/parrot-egg-nest/find-one-by-species-id';
        return axiosClinet.get(url, { params });
    },
    //Nest-usage-history
    add(data) {
        const url = `/nest-usage-history`;
        return axiosClinet.post(url, data);
    },
    //Nest Price
    getAll(params) {
        const url = '/nest-price';
        return axiosClinet.get(url, { params });
    },

    getNestPriceBySpeciesId(id) {
        const url = `/nest-price/find-by-species-id?speciesId=${id}`;
        return axiosClinet.get(url);
    },
    addNestPrice(data) {
        const url = `/nest-price`;
        return axiosClinet.post(url, data);
    },
    changeStatusForNestPrice(id) {
        const url = `/nest-price/${id}`;
        return axiosClinet.delete(url);
    },
    //Nest-development-status
    getAllNestDevelopmentStatus(params) {
        const url = '/nest-development-status';
        return axiosClinet.get(url, { params });
    },
    addNestDevelopmentStatus(data) {
        const url = `/nest-development-status`;
        return axiosClinet.post(url, data);
    },
    changeStatusForNestDevelopmentStatus(id) {
        const url = `/nest-development-status/${id}`;
        return axiosClinet.delete(url);
    },
};

export default NestAPI;
