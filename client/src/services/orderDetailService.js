import http from '../http-common';

class orderDetailService {
    get(id) {
        return http.get(`/orderdetail/${id}`);
    }
    create(data) {
        return http.post("/orderdetail", data);
    }
    update(id ,data) {
        return http.put(`/orderdetail/${id}`,data);
    }
    delete(id) {
        return http.delete(`/orderdetail/${id}`);
    }
}

export default new orderDetailService();