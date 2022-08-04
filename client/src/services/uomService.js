import http from '../http-common';

class UomService {
    getAll(){
        return http.get("/uom");
    }
    get(id) {
        return http.get(`/uom/${id}`);
    }
    create(data) {
    return http.post("/uom", data);
    }
    update(id, data) {
    return http.put(`/uom/${id}`, data);
    }
    delete(id) {
    return http.delete(`/uom/${id}`);
    }
    deleteAll() {
    return http.delete(`/uom`);
    }
    findByLabel(label) {
    return http.get(`/uom?descs=${label}`);
    }


}

export default new UomService();