/* eslint-disable */
exports.createInvoice = async (order,orderdetail,subtotalDetail,grandTotal) => {
    function currencyFormat(num) {
        return 'Rp. ' + num.toFixed().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }
    let getSubTotal = currencyFormat(subtotalDetail)
    let getGrandTotal = currencyFormat(grandTotal)
    let Order = {
        orderNo: order.orderNo,
        dateIssued: new Date(order.dateIssued).toISOString().slice(0, 10),
        partners: order.partners,
        custName: order.custName,
        deliverTo: order.deliverTo,
        deliveryFee: currencyFormat(order.deliveryFee),
        discount: currencyFormat(order.discount),
        note: order.note,
        payments: order.payments,
        paymentDesc: order.paymentDesc,
        docStatus: order.docStatus,
        total: order.total,
    }
    let OrderDetail = []
    orderdetail.forEach(function(i) {
        var item = {}
        item.desc = i.desc
        item.keyname = i.keyname
        item.qtyOrdered = i.qtyOrdered
        item.sales_price = currencyFormat(i.sales_price)
        item.shortDesc = i.shortDesc
        item.subTotal = currencyFormat(i.subTotal)
        OrderDetail.push(item);
    })

    function getDetailOrderItem(data) {
        var columns = ['keyname', 'shortDesc','qtyOrdered','sales_price','subTotal']
        var body = []
        body.push([{  fillColor: '#3A4D8F',text: 'No Produk', style: 'tableHeader'}, {fillColor: '#3A4D8F',text: 'Nama Barang', style: 'tableHeader'}, {fillColor: '#3A4D8F',text: 'QTY', style: 'tableHeader'},{fillColor: '#3A4D8F',text: 'Harga', style: 'tableHeader'},{fillColor: '#3A4D8F',text: 'Sub Total', style: 'tableHeader'}])
        data.forEach(function(row) {
            var dataRow = [];
            columns.forEach(function(column){
                dataRow.push({text:row[column].toString(),style:'contentleft',fontSize:9});
            })
            body.push(dataRow);
        })
        body.push([{colSpan: 4,text:'Sub Total :',style: 'subheader'},'','','',{text:getSubTotal,style: 'subheader'}])
        if(Order.deliveryFee != 'Rp. 0'){
            body.push([{colSpan: 4,text:'Ongkir :',style: 'subheader'},'','','',{text:Order.deliveryFee,style: 'subheader'}])
        }
        if(Order.discount != 'Rp. 0'){
            body.push([{colSpan: 4,text:'Diskon :',style: 'subheader'},'','','',{text:Order.discount,style: 'subheader'}])
        }
        body.push([{colSpan: 4,text:'Grand Total :',style: 'subheader'},'','','',{text:getGrandTotal,style: 'subheader'}])
        return body;
    }

    let docDefinition = {
        content: [
            {
                columns: [
                    {text: 'Invoice', style: 'header'},
                    {text: 'Order No : ' + Order.orderNo, style: 'subheader'},
                ],
            },
            {
                style: 'tableExample',
                table: {
                    headerRows: 1,
                    widths: [ '*', 'auto' ],
                    body: [
                        [{text: 'Pelanggan : ' + Order.custName,style: 'contentleft'}, {text: 'Dikirim ke : ' + Order.deliverTo,style: 'contentleft'}],
                        [{text: 'Tanggal : ' + Order.dateIssued,style: 'contentleft'}, {text: 'Pembayaran : ' + Order.paymentDesc,style: 'contentleft'}],
                        [{text: 'Note : ' + Order.note,style: 'contentleft'}, ''],
                    ]
                },
                layout: 'noBorders'
            },
            {
                text: 'Detail Barang \n\n',
                style: 'contentup'
            },
            {
                style: 'tableExample',
                table: {
                    headerRows: 1,
                    // dontBreakRows: true,
                    // keepWithHeaderRows: 1,
                    widths: [ 'auto', '*', 'auto','auto', 'auto' ],
                    body: getDetailOrderItem(OrderDetail)
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
                            },
                        },
            },
            {text: '* Harap melakukan konfirmasi jika sudah melakukan pembayaran, terima kasih.', style: 'small'},
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