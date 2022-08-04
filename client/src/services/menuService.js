import http from '../http-common';

class MenuService {
    getAllMenu(){
        return http.get("/menus");
    }
    get(id) {
        return http.get(`/menus/${id}`);
    }
    create(data) {
    return http.post("/menus", data);
    }
    update(id, data) {
    return http.put(`/menus/${id}`, data);
    }
    delete(id) {
    return http.delete(`/menus/${id}`);
    }
    deleteAll() {
    return http.delete(`/menus`);
    }
    findByLabel(label) {
    return http.get(`/menus?label=${label}`);
    }


}

export default new MenuService();