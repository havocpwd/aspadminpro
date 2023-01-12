import http from '../http-common';

class purchaseOrderService {
    getAll(){
        return http.get("/purhcaseorders");
    }
    get(id) {
        return http.get(`/purhcaseorders/${id}`);
    }
    create(data) {
        return http.post("/purhcaseorders", data);
    }
    update(id, data) {
        return http.put(`/purhcaseorders/${id}`, data);
    }
    delete(id) {
        return http.delete(`/purhcaseorders/${id}`);
    }
    deleteAll() {
        return http.delete(`/purhcaseorders`);
    }
    findByLabel(label) {
        return http.get(`/purhcaseorders?orderno=${label}`);
    }
    filterByDate(start,end) {
        return http.get(`purhcaseorders?start=${start}&end=${end}`);
    }


}

export default new purchaseOrderService();