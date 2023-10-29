import axiosClinet from './AxiosClient';

const PostAPI = {
    getAll(params) {
        const url = '/post';
        return axiosClinet.get(url, { params });
    },
    searchSortForPost(params) {
        const url = '/post/admin/search_sort';
        return axiosClinet.get(url, { params });
    },

    get(params) {
        const url = `/post/find-one-by-id`;
        return axiosClinet.get(url, { params });
    },
    update(data) {
        const url = `/post/${data.id}`;
        return axiosClinet.put(url, data);
    },
};

export default PostAPI;
