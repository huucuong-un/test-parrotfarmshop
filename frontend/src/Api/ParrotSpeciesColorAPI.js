import axiosClinet from './AxiosClient';

const ParrotSpeciesColorAPI = {
    getAll(params) {
        const url = '/parrot-species-color';
        return axiosClinet.get(url, { params });
    },

    get(id) {
        const url = `/parrot-species-color/${id}`;
        return axiosClinet.get(url);
    },

    findByParrotId(id) {
        const url = `/parrot-species-color/find-by-parrot-id/${id}`;
        return axiosClinet.get(url);
    },

    findByParrotSpecieId(id) {
        const url = `/parrot-species-color/find-one-by-id/${id}`;
        return axiosClinet.get(url);
    },
    findOneSpeciesByParrotID(id) {
        const url = `/parrot-species-color/find-by-parrot-species-id/${id}`;
        return axiosClinet.get(url);
    },

    findOneSpeciesColorById(id) {
        const url = `/parrot-species-color/find-one-by-id/${id}`;
        return axiosClinet.get(url);
    },

    findOneSpeciesByColorId(id) {
        const url = `/parrot-species/find-one-species-by-color-id/${id}`;
        return axiosClinet.get(url);
    },

    add(data) {
        const url = '/parrot-species-color';
        return axiosClinet.post(url, data);
    },

    update(data) {
        const url = `/parrot-species-color/${data.id}`;
        return axiosClinet.put(url, data);
    },

    remove(id) {
        const url = `/parrot-species-color/${id}`;
        return axiosClinet.delete(url);
    },

    getImagesByColorId(id) {
        const url = `/color-image/find-by-color/${id}`;
        return axiosClinet.post(url);
    },

    getImagesBySpeciesId(id) {
        const url = `/color-image/find-by-species/${id}`;
        return axiosClinet.post(url);
    },

    getImageURLsBySpeciesId(id) {
        const url = `/color-image/find-by-species/images/${id}`;
        return axiosClinet.post(url);
    },
    searchSortParrotSpecies(params) {
        const url = '/parrot-species/admin/search_sort';
        return axiosClinet.get(url, { params });
    },
};

export default ParrotSpeciesColorAPI;
