import http from '../http-common';

class ReportService {
    getOrdersReports(start,end){
        return http.get(`reports/orders?start=${start}&end=${end}`);
    }

    getPurchaseOrdersReports(start,end){
        return http.get(`reports/purchaseorders?start=${start}&end=${end}`);
    }

    getOrderByPartner(start,end,partnerId){
        return http.get(`reports/customersorders?start=${start}&end=${end}&id=${partnerId}`);
    }

    getPurchaseOrderByPartner(start,end,partnerId){
        return http.get(`reports/customerspurchaseorders?start=${start}&end=${end}&id=${partnerId}`);
    }
}

export default new ReportService();