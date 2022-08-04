import http from '../http-common';

class PaymentService {
    getAll(){
        return http.get("/payments");
    }
    get(id) {
        return http.get(`/payments/${id}`);
    }
    create(data) {
    return http.post("/payments", data);
    }
    update(id, data) {
    return http.put(`/payments/${id}`, data);
    }
    delete(id) {
    return http.delete(`/payments/${id}`);
    }
    deleteAll() {
    return http.delete(`/payments`);
    }
    findByLabel(label) {
    return http.get(`/payments?descs=${label}`);
    }


}

export default new PaymentService();