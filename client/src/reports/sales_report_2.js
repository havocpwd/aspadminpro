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
        order.cogsTotal = i.cogsTotal
        order.orderDetailTotal = i.orderDetailTotal
        order.grandTotal = i.grandTotal
        order.profit = i.grandTotal - i.cogsTotal
        Orders.push(order);
    })

    function getGrandTotal(ar) {
        var sum = 0;
        for (var i = 0; i < ar.length; i++) {
          sum += ar[i].grandTotal;
        }
        return sum;
    }

    function getSedekah(total) {
        var sum = 0;
        sum = (2.5/100) * total;
        return sum;
    }

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
        map.cogsTotal = currencyFormat(i.cogsTotal)
        map.orderDetailTotal = currencyFormat(i.orderDetailTotal)
        map.grandTotal = currencyFormat(i.grandTotal)
        map.profit = currencyFormat(i.profit)
        mapingOrders.push(map);
    })
    function getOrderItem(data) {
        var grandTotal = getGrandTotal(Orders)
        var sedekah  = getSedekah(grandTotal)
        var columns = ['no','orderNo', 'dateIssued','partner','deliverTo','cogsTotal','grandTotal','profit']
        var body = []
        body.push([{  fillColor: '#3A4D8F',text: 'No', style: 'tableHeader'},{fillColor: '#3A4D8F',text: 'No Invoice', style: 'tableHeader'}, {fillColor: '#3A4D8F',text: 'Tanggal', style: 'tableHeader'}, {fillColor: '#3A4D8F',text: 'Pelanggan', style: 'tableHeader'},{fillColor: '#3A4D8F',text: 'dikirim ke', style: 'tableHeader'},{fillColor: '#3A4D8F',text: 'HPP', style: 'tableHeader'},{fillColor: '#3A4D8F',text: 'Total Invoice', style: 'tableHeader'},{fillColor: '#3A4D8F',text: 'Profit', style: 'tableHeader'}])
        data.forEach(function(row) {
            var dataRow = [];
            columns.forEach(function(column){
                dataRow.push({text:row[column].toString(),style:'contentleft',fontSize:9});
            })
            body.push(dataRow);
        })
        body.push([{colSpan: 7,text:'Grant Total :',style: 'subheader'},'','','','','','',{text: currencyFormat(grandTotal),style: 'subheader'}])
        body.push([{colSpan: 7,text:'Sedekah 2,5% :',style: 'subheader'},'','','','','','',{text: currencyFormat(sedekah),style: 'subheader'}])
        return body;
    }
    let docDefinition = {
        content: [
            {
                columns: [
                    {text: 'Laporan Pendapatan Bulanan', style: 'header'},
                    {text: 'Periode : ' + periode, style: 'subheader'},
                ],
            },
            {
                style: 'tableExample',
                table: {
                    headerRows: 1,
                    widths: [ 'auto','auto', 'auto', 'auto','auto','*','*','*' ],
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