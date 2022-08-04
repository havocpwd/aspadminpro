<template>
    <div>
      <div class="mt-4">
        <v-data-table
            :headers="headers"
            :options="tableOptions"
            :footer-props="{'items-per-page-options':[15, 30, 50, 100, -1]}"
            :items="orders"
            :items-per-page="15"
            class="elevation-1"
            :loading ="loading"
            loading-text="Loading... Please wait"
            :single-expand="singleExpand"
            :expanded.sync="expanded"
            show-expand
        >
        <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2">mdi-printer</v-icon>
        <v-icon small class="mr-2" @click="editOrder(item)">mdi-pencil</v-icon>
        </template>
        <template v-slot:top>
          <v-toolbar flat>
            <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
              >
              <template v-slot:activator="{ on, attrs }">
              <v-text-field
                  v-model="dateRangeText"
                  label="Periode"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  rounded
              ></v-text-field>
              </template>
              <v-date-picker
                  v-model="dates"
                  range
                  @change="retrieveorders"
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
                  @click="$refs.menu.save(dates)"
                >
                  OK
                </v-btn>
              </v-date-picker>
              </v-menu>
            <v-spacer></v-spacer>
            <v-autocomplete
            prepend-icon="mdi-account-clock"
            v-model="partnerSelected"
            label="Customer"
            :items="customers"
            :item-text = "getNameCustomers"
            item-value = "id"
            dense
            @change="retrieveorders"
            ></v-autocomplete>
              <v-btn
              color="primary"
              dark
              icon
              @click="printSalesReport"
              >
              <v-icon>mdi-printer</v-icon>
              </v-btn>
          </v-toolbar>
        </template>
        <template v-slot:expanded-item="{ headers,item }">
          <td :colspan="headers.length">
          <div class="mt-4">
              <v-simple-table dense>
                  <template v-slot:default>
                  <thead>
                      <tr>
                      <th class="text-left">Keyname</th>
                      <th class="text-left">Description</th>
                      <th class="text-left">Qty</th>
                      <th class="text-left">Cogs</th>
                      <th class="text-left">Harga</th>
                      <th class="text-left">Total</th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr v-for="n in item.orderDetail" :key="n.id">
                      <td>{{n.products[0].keyname}}</td>
                      <td>{{n.shortDesc}}</td>
                      <td>{{n.qtyOrdered}}</td>
                      <td>{{n.cogs}}</td>
                      <td>{{n.unitPrice}}</td>
                      <td>{{n.total}}</td>
                      </tr>
                  </tbody>
                  </template>
              </v-simple-table>
          </div>
          </td>
        </template>
        </v-data-table>
      </div>
    </div>
</template>

<script>
/* eslint-disable */
import reportService from '@/services/reportService';
import customerService from '@/services/customerService';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import salesOrderByCustomer from "@/reports/sales_by_customer_report";

export default {
    data: () => ({
        expanded: [],
        getAllOrder: false,
        singleExpand: false,
        loading: false,
        menu: false,
        dates: ['2019-09-10', '2019-09-20'],
        tableOptions: {
            itemsPerPage: 30
        },
        headers: [
          { text: 'No',value: 'index',class: "primary"},
          { text: 'Order No',align: 'start', value: 'orderNo',class: "primary"},
          { text: 'Date Issued', value: 'dateIssued',class: "primary"},
          { text: 'Customer', value: 'partner',class: "primary" },
          { text: 'deliverTo', value: 'deliverTo',class: "primary" },
          { text: 'Note', value: 'note',class: "primary" },
          { text: 'Total', value: 'total',class: "primary" },
          { text: 'Status', value: 'docStatus',class: "primary" },
          { text: "Actions", value: "actions", sortable: false ,class: "primary"},
        ],
        orders: [],
        dateStart: new Date(),
        dateEnd: new Date(),
        partnerSelected:{},
        customers: [],
    }),
    computed: {
      dateRangeText () {
        return this.dates.join(' ~ ')
      },
    },
    mounted() {
        this.retrieveCustomers();
        this.getPeriodeDate();
    },
    methods:{
        getPeriodeDate(){
          let currentDate = new Date()
          currentDate.setDate(24)
          let today = new Date()

          if(currentDate.getDate()>=today.getDate() && currentDate.getMonth()==today.getMonth()){
            this.dateStart.setDate(24);
            this.dateStart.setMonth(this.dateStart.getMonth() - 1);
            this.dateEnd.setDate(this.dateStart.getDate() + 30);
            this.dateEnd.setMonth(this.dateEnd.getMonth() - 1);
          }else{
            this.dateStart.setDate(24);
            this.dateEnd.setDate(this.dateStart.getDate() + 30);
            this.dateEnd.setMonth(this.dateEnd.getMonth());
          }
          this.dates = [this.dateStart.toISOString().substring(0, 10),this.dateEnd.toISOString().substring(0, 10)]
        },
        retrieveorders() {
          if(Object.keys(this.partnerSelected).length === 0){
              console.log('Pilih customers terlebih dahulu')
            }else{
              reportService.getOrderByPartner(this.dates[0],this.dates[1],this.partnerSelected)
              .then((response) => {
              this.loading = false;
              this.orders = response.data.orders.map(this.getDisplay);
              })
              .catch((e) => {
              console.log(e);
              });
            }
        },
        getDisplay(order,index){
        return {
          index: index + 1,
          id: order._id,
          orderNo: order.orderNo,
          dateIssued: this.$moment(order.dateIssued,'YYYY-MM-DD').format('LL'),
          partner: order.partners.first_name + " " + order.partners.last_name,
          deliverTo: order.deliverTo,
          deliveryFee: order.deliveryFee,
          discount: order.discount,
          note: order.note,
          payment:order.payments.desc,
          docStatus: order.docStatus,
          total: order.total,
          orderDetail: order.orderdetails
          }
        },
        retrieveCustomers() {
            customerService.getAll()
            .then((response) => {
                this.customers = response.data.partners;
            })
        },
        getNameCustomers(customer) {
            return `${customer.first_name} ${customer.last_name}`;
        },
        async printSalesReport(){
          const docDefinition = await salesOrderByCustomer.createSalesReport(this.orders, this.dates);
          const pdf = await pdfMake.createPdf(docDefinition);
          pdf.open();
        }
    }
}
</script>