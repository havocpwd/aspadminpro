<template>
<v-container class="down-top-padding" fluid>
    <BaseCard heading="Data Invoice">
        <v-toolbar flat>
        <v-spacer></v-spacer>
        <v-btn color="primary" dark icon @click="EditOrder" v-if="id"> <v-icon>mdi-pencil</v-icon> </v-btn>
        <v-btn color="primary" dark icon @click="NewOrder" v-else> <v-icon>mdi-plus-circle</v-icon> </v-btn>
        <v-btn color="primary" dark icon @click="generateInvoice"> <v-icon>mdi-printer</v-icon> </v-btn>
        </v-toolbar>
        <v-form
            ref="form"
            v-model="valid"
            lazy-validation
            :disabled="isDisabled"
        >
        <v-card class="d-flex" flat tile>
            <v-col
                cols="1"
                style="min-width: 50px; max-width: 50%;"
                class="flex-grow-1 flex-shrink-0"
            >
                <v-card
                class="pa-2"
                flat
                tile
                >
                <v-text-field
                prepend-icon="mdi-file-document-outline"
                v-model="order.orderNo"
                label="Order No"
                required
                dense
                disabled
                ></v-text-field>
                <v-autocomplete
                prepend-icon="mdi-account-clock"
                v-model="order.partners"
                label="Supplier"
                :items="suppliers"
                :item-text = "getNameCustomers"
                item-value = "id"
                dense
                ></v-autocomplete>
                <v-menu
                    ref="menu"
                    v-model="menu"
                    :close-on-content-click="false"
                    :return-value.sync="order.dateIssued"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                >
                    <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                        v-model="order.dateIssued"
                        label="Date Issued"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        dense
                    ></v-text-field>
                    </template>
                    <v-date-picker
                    v-model="order.dateIssued"
                    no-title
                    scrollable
                    >
                    <v-spacer></v-spacer>
                    <v-btn
                        text
                        color="primary"
                        @click="menu = false"
                    >
                        Cancel
                    </v-btn>
                    <v-btn
                        text
                        color="primary"
                        @click="$refs.menu.save(order.dateIssued)"
                    >
                        OK
                    </v-btn>
                    </v-date-picker>
                </v-menu>
                </v-card>
            </v-col>
            <v-col
                cols="1"
                style="min-width: 50px; max-width: 50%;"
                class="flex-grow-1 flex-shrink-0"
            >
                <v-card
                class="pa-2"
                flat
                tile
                >
                <v-textarea
                class="mx-2"
                rows="1"
                prepend-icon="mdi-comment"
                v-model="order.note"
                color="teal"
                dense
                >
                <template v-slot:label>
                    <div>
                    Note <small>(optional)</small>
                    </div>
                </template>
                </v-textarea>
                </v-card>
            </v-col>

            <v-col
                cols="1"
                style="min-width: 50px; max-width: 50%;"
                class="flex-grow-1 flex-shrink-0"
            >
                <v-card
                class="pa-2"
                flat
                tile
                >
                <v-textarea
                class="mx-2"
                rows="1"
                prepend-icon="mdi-truck-outline"
                v-model="order.deliverTo"
                color="teal"
                dense
                >
                <template v-slot:label>
                    <div>
                    Delivery To
                    </div>
                </template>
                </v-textarea>
                <v-select
                    prepend-icon="mdi-cash-clock"
                    :items="payments"
                    v-model="order.payments"
                    label="Pembayaran"
                    item-text = "desc"
                    item-value = "id"
                ></v-select>
                </v-card>
            </v-col>
        </v-card>
        <v-card class="d-flex" flat tile>
            <v-col
                cols="1"
                style="min-width: 50px; max-width: 100%;"
                class="flex-grow-1 flex-shrink-0"
            >
            <v-card-title>
            Detail Barang
            <v-spacer></v-spacer>
            <v-btn
            :disabled = "btnTambahBarang"
            color="primary"
            class="ma-2"
            dark
            @click="dialog = true">Tambah Barang</v-btn>
            </v-card-title>
            <v-dialog
                v-model="dialog"
                transition="dialog-top-transition"
                max-width="900"
                scrollable
            >
                <template>
                <v-card>
                <v-card-title>
                Daftar Barang
                <v-spacer></v-spacer>
                <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Search"
                    single-line
                    hide-details
                ></v-text-field>
                </v-card-title>
                <!-- table produk -->
                <v-data-table
                :headers="productheaders"
                :items="products"
                :search="search"
                :items-per-page="15"
                show-select
                v-model="selected"
                item-key="id"
                ></v-data-table>
                <v-card-actions class="justify-end">
                <v-btn
                    text
                    @click="closeDaftarBarang"
                >Close</v-btn>
                <v-btn
                    text
                    @click="addDetailOrder(selected)"
                >Tambah</v-btn>
                </v-card-actions>
                </v-card>
                </template>
            </v-dialog>
            <v-data-table
            :headers="headers"
            :items="orderDetail"
            :disable-pagination="true"
            :disable-items-per-page="true"
            :hide-default-footer="true"
            dense
            >
            <template v-slot:[`item.shortDesc`]="{ item }">
                <v-text-field flat dense
                v-model="item.shortDesc"
                ></v-text-field>
            </template>
            <template v-slot:[`item.qtyOrdered`]="{ item }">
                <v-text-field flat dense
                v-model="item.qtyOrdered"
                ></v-text-field>
            </template>
            <template v-slot:[`item.sales_price`]="{ item }">
                <v-text-field flat dense
                v-model="item.sales_price"
                ></v-text-field>
            </template>
            <template v-slot:[`item.subtotal`]="{ item }">
                <v-text-field flat dense
                :value="item.sales_price * item.qtyOrdered" disabled
                ></v-text-field>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="editOrderDetail(item.OrderDetailId,item)" v-if="editMode">mdi-check</v-icon>
            <v-icon small @click="deleteOrderDetail(item.OrderDetailId, item)" v-if="editMode">mdi-delete</v-icon>
            </template>
            </v-data-table>
            </v-col>
        </v-card>
        <v-card class="d-flex align-end flex-column" flat tile>
                <v-card class="pa-2" flat tile> 
                    <v-text-field label="Sub Total" flat dense :value="subtotalDetail"></v-text-field>
                    <v-text-field label="Diskon" flat dense v-model="order.discount"></v-text-field>
                    <v-text-field label="Biaya Pengiriman" flat dense v-model="order.deliveryFee"></v-text-field>
                    <v-text-field label="Grand Total" flat dense v-model="grandTotal"></v-text-field>
                </v-card>
        </v-card>
        <v-card
        class="d-flex justify-center mb-6"
        flat
        tile
        >
        <v-card
            flat
            tile
        >
            <v-btn
            class="ma-2"
            color="secondary"
            @click="cancelOrder"
            >
            Cancel
            </v-btn>

            <v-btn
            class="ma-2"
            :disabled="btnSave"
            color="primary"
            @click="saveOrder(id)"
            >
            Save
            </v-btn>
        </v-card>
        </v-card>
        </v-form>
    </BaseCard>
</v-container>
</template>

<script>
import supplierService from '@/services/supplierService';
import paymentService from '@/services/paymentService';
import productService from '@/services/productService';
import purchaseOrderService from '@/services/purchaseOrderService';
import orderDetailService from '@/services/orderDetailService';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import poInvoice from "@/reports/po_invoice";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
export default {
    props:['id'],
    data: () => ({
        editMode: false,
        loader: null,
        loading: false,
        isDisabled: true,
        btnTambahBarang: true,
        btnSave: true,
        search: '',
        dialog: false,
        valid: true,
        menu: false,
        suppliers: [],
        payments: [],
        headers: [
            {
            text: 'Keyname',
            align: 'left',
            sortable: false,
            value: 'keyname',
            },
            { text: 'Desc', value: 'shortDesc' ,sortable: false},
            { text: 'Qty', value: 'qtyOrdered' ,sortable: false},
            { text: 'Price', value: 'sales_price' ,sortable: false},
            { text: 'Sub Total', value: 'subtotal' ,sortable: false},
            { text: "Actions", value: "actions", sortable: false},

        ],
        productheaders: [
            {
            text: 'Keyname',
            align: 'left',
            sortable: false,
            value: 'keyname',
            },
            { text: 'Desc', value: 'desc' ,sortable: false},
            { text: 'Uom', value: 'uoms' ,sortable: false},
            { text: 'Kategori', value: 'categories' ,sortable: false},
            { text: 'Harga', value: 'sales_price' ,sortable: false},
            { text: 'Stock', value: 'stock' ,sortable: false},
        ],
        order:  {
                orderType:"",
                orderNo: "",
                dateIssued: "",
                partners: {},
                deliverTo:"",
                deliveryFee:0,
                discount:0,
                note: "",
                payments:{},
                docStatus:"",
                },
        orderDetail:[],
        selected: [],
        products:[],
    }),
    computed: {
        subtotalDetail(){
            var total = 0;
            total = this.orderDetail.reduce((acc, item) => acc + (item.qtyOrdered*item.sales_price),0);
            return total
        },
        grandTotal:function(){
            var total = 0;
            var totaldisc=0;
            var delFee=0;
            if(this.order.discount){
                totaldisc = this.order.discount;
            }
            if(this.order.deliveryFee){
                delFee = parseFloat(this.order.deliveryFee);
            }
            total = this.subtotalDetail-totaldisc+delFee;
            return total;
        }
    },
    mounted(){
        this.refreshlist();
    },
    methods:{
        onScroll (e) {
            this.offsetTop = e.target.scrollTop
        },
        retrievedOrder(id){
            purchaseOrderService.get(id)
            .then((response)=> {
                this.order = {
                    orderNo: response.data.order.orderNo,
                    dateIssued: new Date(response.data.order.dateIssued).toISOString().slice(0, 10),
                    partners: response.data.order.partners._id,
                    custName: this.getNameCustomers(response.data.order.partners),
                    deliverTo: response.data.order.deliverTo,
                    deliveryFee: response.data.order.deliveryFee,
                    discount: response.data.order.discount,
                    note: response.data.order.note,
                    payments: response.data.order.payments._id,
                    paymentDesc: response.data.order.payments.desc,
                    docStatus: response.data.order.docStatus,
                    total: response.data.order.total,
                }
                this.orderDetail = response.data.order.orderdetails.map(this.getDisplayOrderdetail);
            })
        },
        retrieveCustomers() {
            supplierService.getAll()
            .then((response) => {
                this.suppliers = response.data.partners;
            })
        },
        retrievePeyments() {
            paymentService.getAll()
            .then((response) => {
                this.payments = response.data.payments;
            })
        },
        retrieveProducts() {
            productService.getAll()
            .then((response) => {
                this.products = response.data.products.map(this.getDisplayproducts);
            })
        },
        getDisplayOrderdetail(obj){
            return {
                OrderDetailId:obj._id,
                productId: obj.products._id,
                keyname:obj.products.keyname,
                shortDesc: obj.shortDesc,
                desc: obj.products.desc,
                qtyOrdered: obj.qtyOrdered,
                cogs: obj.cogs,
                sales_price: obj.unitPrice,
                subTotal: obj.qtyOrdered * obj.unitPrice,
            }
        },
        getDisplayproducts(product){
            return {
            id: product.id,
            keyname: product.keyname,
            desc: product.desc,
            uoms: product.uoms.code,
            categories: product.categories.desc,
            purchase_price: product.purchase_price,
            sales_price: product.sales_price,
            qtyOrdered: product.qtyOrdered
            }
        },
        getNameCustomers(customer) {
            return `${customer.first_name} ${customer.last_name}`;
        },
        NewOrder(){
            this.editMode = true;
            this.isDisabled = false;
            this.btnTambahBarang = false;
            this.btnSave = false;
            this.order = {
                discount: 0,
                deliveryFee: 0,
                orderNo : Math.floor(new Date().valueOf() * Math.random()),
                dateIssued: new Date().toISOString().substring(0, 10)
            }
        },
        EditOrder(){
            this.editMode = true;
            this.isDisabled = false;
            this.btnTambahBarang = false;
            this.btnSave = false;
        },
        editOrderDetail(id,item){
            var orderId = this.id;
            var ItemWithOrderId = {};
            ItemWithOrderId = {
                orderId : orderId,
                productId : item.productId,
                keyname: item.keyname,
                shortDesc: item.shortDesc,
                cogs: item.cogs,
                sales_price: item.sales_price,
                qtyOrdered: item.qtyOrdered
            }
            if(id == undefined){
                orderDetailService.create(ItemWithOrderId)
                .then((response) => {
                    console.log(response.data.message);
                    this.refreshlist();
                })
                .catch((e) => {
                    console.log(e)
                });
            }else{
                orderDetailService.update(id,item)
                .then((response) => {
                    console.log(response.data.message);
                    this.refreshlist();
                })
                .catch((e) => {
                    console.log(e)
                });
            }
        },

        delArray(arr,item){
            arr.splice(arr.indexOf(item),1);
        },

        async deleteOrderDetail(id,item){
            const arr = this.orderDetail;
            if(id == undefined) {
                this.delArray(arr,item)
            }else{
                await orderDetailService.delete(id)
                .then((response) => {
                    console.log(response.data.message);
                    this.delArray(arr,item)
                })
                .catch((e) => {
                    console.log(e)
                });
            }
        },
           async saveOrder(id){
            var data = {
                orderNo: this.order.orderNo,
                dateIssued: this.order.dateIssued,
                partners: this.order.partners,
                deliverTo: this.order.deliverTo,
                deliveryFee: this.order.deliveryFee,
                discount: this.order.discount,
                note: this.order.note,
                payments: this.order.payments,
                docStatus: "Draft",
                total: this.grandTotal,
                orderdetails: this.orderDetail,
            }
            if(id){
                console.log('processing update...')
                await purchaseOrderService.update(id,data)
                .then((response) => {
                    console.log(response.data.message);
                    })
                    .catch((e) => {
                    console.log(e);
                });
                this.$router.go();
            }else{
                purchaseOrderService.create(data)
                .then(() => {
                    this.refreshlist();
                    })
                    .catch((e) => {
                    console.log(e);
                });
                this.$router.push({ path: '/po' });
            }
        },
        cancelOrder(){
            this.$router.go();
        },
        closeDaftarBarang(){
            this.dialog = false;
            this.selected = []; 
        },
        addDetailOrder(data){
            for (var i = 0; i < data.length; i++) {
                if (data[i] == 1) data.push(5);
                this.orderDetail.push(
                    {
                        productId: data[i].id,
                        keyname: data[i].keyname,
                        shortDesc: data[i].desc,
                        cogs: data[i].purchase_price,
                        sales_price: data[i].sales_price,
                    }
                );
            }
        },
        refreshlist(){
            if (this.id){
                this.retrievedOrder(this.id);
            }
            this.retrieveCustomers();
            this.retrievePeyments();
            this.retrieveProducts();
        },
        async generateInvoice(){
            const docDefinition = await poInvoice.createInvoice(this.order,this.orderDetail,this.subtotalDetail,this.grandTotal);
            const pdf = await pdfMake.createPdf(docDefinition);
            pdf.download(this.order.custName.split(' ').join('_')+'_PO'+this.order.orderNo+'.pdf');
            pdf.open();
        }
    }
}
</script>