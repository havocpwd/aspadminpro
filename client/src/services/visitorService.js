import http from '../http-common';

class VisitorService {
    getAll(){
        return http.get("/visitor");
    }
    get(id) {
        return http.get(`/visitor/${id}`);
    }
    create(data) {
    return http.post("/visitor", data);
    }
    update(id, data) {
    return http.put(`/visitor/${id}`, data);
    }


}

export default new VisitorService();