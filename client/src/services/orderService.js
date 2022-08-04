import http from '../http-common';

class OrderService {
    getAll(){
        return http.get("/orders");
    }
    get(id) {
        return http.get(`/orders/${id}`);
    }
    create(data) {
        return http.post("/orders", data);
    }
    update(id, data) {
        return http.put(`/orders/${id}`, data);
    }
    delete(id) {
        return http.delete(`/orders/${id}`);
    }
    deleteAll() {
        return http.delete(`/orders`);
    }
    findByLabel(label) {
        return http.get(`/orders?orderno=${label}`);
    }
    filterByDate(start,end) {
        return http.get(`orders?start=${start}&end=${end}`);
    }


}

export default new OrderService();