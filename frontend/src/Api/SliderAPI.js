import axiosClinet from './AxiosClient';
const SliderAPI = {
    getAll(params) {
        const url = '/slider';
        return axiosClinet.get(url, { params });
    },
    update(data) {
        const url = `/slider/${data.id}`;
        return axiosClinet.put(url, data);
    },
    searchSortForSlider(params) {
        const url = '/slider/admin/search_sort';
        return axiosClinet.get(url, { params });
    },
};
export default SliderAPI;
