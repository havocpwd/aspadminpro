import http from '../http-common';

class ReportService {
    getOrdersReports(start,end){
        return http.get(`reports/orders?start=${start}&end=${end}`);
    }

    getOrderByPartner(start,end,partnerId){
        return http.get(`reports/customers?start=${start}&end=${end}&id=${partnerId}`);
    }
}

export default new ReportService();