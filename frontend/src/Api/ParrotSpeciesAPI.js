import axiosClinet from './AxiosClient';

const ParrotSpeciesAPI = {
    getAll(params) {
        const url = '/parrot-species';
        return axiosClinet.get(url, { params });
    },
    getListBySpeciesId(speciesId) {
        const url = `/parrot-species-color/find-by-parrot-species-id/${speciesId}`;
        return axiosClinet.get(url);
    },
    get(id) {
        const url = `/parrot-species/find-one-species-by-id/${id}`;
        return axiosClinet.get(url);
    },
    getSpeciesBySpeciesIdObject(id) {
        const url = `/parrot-species/find-one-species-by-id-object/${id}`;
        return axiosClinet.get(url);
    },
    getListBySpeciesId(speciesId) {
        const url = `/parrot-species-color/find-by-parrot-species-id/${speciesId}`;
        return axiosClinet.get(url);
    },

    getSpeciesByColorId(id) {
        const url = `/parrot-species/find-one-species-by-color-id/${id}`;
        return axiosClinet.get(url);
    },

    add(data) {
        const url = `/parrot-species`;
        return axiosClinet.post(url, data);
    },

    update(data) {
        const url = `/parrot-species/${data.id}`;
        return axiosClinet.put(url, data);
    },

    remove(id) {
        const url = `/parrot-species/${id}`;
        return axiosClinet.delete(url);
    },
    sort(params) {
        const url = `/parrot-species/sort`;
        return axiosClinet.get(url, { params });
    },
    search(params) {
        const url = `/parrot-species/search`;
        return axiosClinet.get(url, { params });
    },
};

export default ParrotSpeciesAPI;
