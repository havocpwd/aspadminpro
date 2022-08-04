import http from '../http-common';

class CurrencyService {
    getAll(){
        return http.get("/currencies");
    }
    get(id) {
        return http.get(`/currencies/${id}`);
    }
    create(data) {
    return http.post("/currencies", data);
    }
    update(id, data) {
    return http.put(`/currencies/${id}`, data);
    }
    delete(id) {
    return http.delete(`/currencies/${id}`);
    }
    deleteAll() {
    return http.delete(`/currencies`);
    }
    findByLabel(label) {
    return http.get(`/currencies?descs=${label}`);
    }
    getExchangeRate(){
        const rates = http.get('/rates');
        return rates;
    }


}

export default new CurrencyService();