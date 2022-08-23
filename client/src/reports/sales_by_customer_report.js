/* eslint-disable */
exports.createSalesReport = async (data,periode) => {
    function currencyFormat(num) {
        return 'Rp. ' + num.toFixed().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }
    let Orders = []
    data.forEach(function(i) {
        var order = {}
        order.dateIssued = i.dateIssued
        order.deliverTo = i.deliverTo
        order.deliveryFee = i.deliveryFee
        order.discount = i.discount
        order.note = i.note
        order.orderNo = i.orderNo
        order.partner = i.partner
        order.payment = i.payment
        order.total = i.total
        order.orderDetail= i.orderDetail
        Orders.push(order);
    })

    function getGrandTotal(ar) {
        var sum = 0;
        for (var i = 0; i < ar.length; i++) {
          sum += ar[i].total;
        }
        return sum;
    }

    detailOrdersData = Orders.flatMap(({
        orderNo,
        dateIssued,
        partner,
        deliverTo,
        orderDetail
    }) => orderDetail.map(s => ({
        orderNo:orderNo,
        dateIssued:dateIssued,
        partner:partner,
        deliverTo:deliverTo,
        ...s
    })));
    console.log(detailOrdersData)
    function getDataDetailOrders(data){
        var columns = ['orderNo', 'dateIssued','partner','deliverTo','shortDesc','qtyOrdered','unitPrice','total']
        var body = []
        body.push([{  fillColor: '#3A4D8F',text: 'Order No', style: 'tableHeader'},{fillColor: '#3A4D8F',text: 'Tanggal', style: 'tableHeader'}, {fillColor: '#3A4D8F',text: 'Pelanggan', style: 'tableHeader'},{fillColor: '#3A4D8F',text: 'dikirim ke', style: 'tableHeader'},{fillColor: '#3A4D8F',text: 'Nama Barang', style: 'tableHeader'},{fillColor: '#3A4D8F',text: 'QTY', style: 'tableHeader'},{fillColor: '#3A4D8F',text: 'Harga', style: 'tableHeader'},{fillColor: '#3A4D8F',text: 'Total', style: 'tableHeader'},])
        data.forEach(function(row) {
            var dataRow = [];
            columns.forEach(function(column){
                dataRow.push({text:row[column].toString(),style:'contentleft',fontSize:8});
            })
            body.push(dataRow);
        })
        return body;
    }

    // (async () => {
    //     console.log(await getDataDetailOrders(detailOrdersData));
    // }
    // )()

    let mapingOrders =[]
    Orders.forEach(function(i,index){
        var map = {}
        map.no = index + 1
        map.dateIssued = i.dateIssued
        map.deliverTo = i.deliverTo
        map.deliveryFee = i.deliveryFee
        map.discount = i.discount
        map.note = i.note
        map.orderNo = i.orderNo
        map.partner = i.partner
        map.payment = i.payment
        map.grandTotal = currencyFormat(i.total)
        mapingOrders.push(map);
    })
    function getOrderItem(data) {
        var grandTotal = getGrandTotal(Orders)
        var columns = ['no','orderNo', 'dateIssued','partner','deliverTo','grandTotal']
        var body = []
        body.push([{  fillColor: '#3A4D8F',text: 'No', style: 'tableHeader'},{fillColor: '#3A4D8F',text: 'No Invoice', style: 'tableHeader'}, {fillColor: '#3A4D8F',text: 'Tanggal', style: 'tableHeader'}, {fillColor: '#3A4D8F',text: 'Pelanggan', style: 'tableHeader'},{fillColor: '#3A4D8F',text: 'dikirim ke', style: 'tableHeader'},{fillColor: '#3A4D8F',text: 'Total Invoice', style: 'tableHeader'}])
        data.forEach(function(row) {
            var dataRow = [];
            columns.forEach(function(column){
                dataRow.push({text:row[column].toString(),style:'contentleft',fontSize:9});
            })
            body.push(dataRow);
        })
        body.push([{colSpan: 5,text:'Grant Total :',style: 'subheader'},'','','','',{text: currencyFormat(grandTotal),style: 'subheader'}])
        return body;
    }

    let docDefinition = {
        content: [
            {
                columns: [
                    {text: 'Laporan Piutang Pelanggan', style: 'header'},
                    {text: 'Periode : ' + periode, style: 'subheader'},
                ],
            },
            {
                style: 'tableExample',
                table: {
                    headerRows: 1,
                    widths: [ 'auto','auto', 'auto', 'auto','auto','auto','auto','*' ],
                    body: getDataDetailOrders(detailOrdersData)
                }
            },
            {
                text: ' '
            },
            {
                style: 'tableExample',
                table: {
                    headerRows: 1,
                    widths: [ 'auto','auto', 'auto', 'auto','auto','*' ],
                    body: getOrderItem(mapingOrders)
                },
                layout: {
                            hLineWidth: function (i, node) {
                                return (i === 0 || i === node.table.body.length) ? 1 : 1;
                            },
                            vLineWidth: function (i, node) {
                                return (i === 0 || i === node.table.widths.length) ? 1 : 1;
                            },
                            hLineColor: function (i, node) {
                                return 'grey';
                            },
                            vLineColor: function (i, node) {
                                return 'grey';
                            },
                            fillColor: function (rowIndex, node, columnIndex) {
                                return (rowIndex % 2 === 0) ? '#CCCCCC' : null;
                            }
                        },
            },
            {text: '* Laporan ini dibuat berdasarkan dengan data yang sudah masuk kedalam system.', style: 'small'},
        ],
        styles: {
            header: {
                fontSize: 12,
                bold: true,
                color: '#3A4D8F',
                margin: [0, 0, 0, 30]
            },
            subheader: {
                fontSize: 10,
                alignment: 'right',
                margin: [0, 0, 0, 1]
            },
            contentleft:{
                fontSize: 10,
                margin: [0, 2, 0, 2]
            },
            contentup:{
                fontSize: 10,
                bold:true,
                margin: [0, 30, 0, 0]
            },
            superMargin: {
                margin: [20, 0, 40, 0],
                fontSize: 15
            },
            small: {
                fontSize: 8,
                margin: [0, 40, 40, 20],
                italics: true
            },
            tableExample: {
                margin: [0, 0, 0, 0]
            },
            tableHeader: {
                bold: true,
                fontSize: 10,
                color: 'white'
            }
        }
    };
    return docDefinition;
}