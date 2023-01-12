<template>
    <div>
    <div class="mt-4">
      <v-data-table
        :headers="headers"
        :options="tableOptions"
        :footer-props="{'items-per-page-options':[60, 70, 100, -1]}"
        :items="orders"
        :search="search"
        :items-per-page="15"
        class="elevation-1"
        :loading ="loading"
        loading-text="Loading... Please wait"
        :single-expand="singleExpand"
        :expanded.sync="expanded"
        show-expand
        dense
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
              class="shrink"
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
          <v-checkbox
            v-model="getAllOrder"
            label="Tampilkan Semua"
            @change="retrieveorders"
            class="shrink"
          ></v-checkbox>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
          class="shrink"
        ></v-text-field>
         <v-btn
          color="primary"
          dark
          icon
          @click="addOrder"
          >
          <v-icon>mdi-plus-circle</v-icon>
          </v-btn>
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
                  <td>{{n.products.keyname}}</td>
                  <td>{{n.products.desc}}</td>
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
import purchaseOrderService from '@/services/purchaseOrderService';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import salesOrderReport from "@/reports/sales_report";

export default {
    data: () => ({
        expanded: [],
        getAllOrder: false,
        singleExpand: false,
        loading: false,
        search:'',
        menu: false,
        dates: ['2019-09-10', '2019-09-20'],
        tableOptions: {
            itemsPerPage: 60
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
        dateEnd: new Date()
    }),
    computed: {
      dateRangeText () {
        return this.dates.join(' ~ ')
      },
    },
    mounted() {
      this.getPeriodeDate();
      this.retrieveorders();
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
          this.loading = true;
          if(this.getAllOrder===false){
            purchaseOrderService.filterByDate(this.dates[0],this.dates[1])
            .then((response) => {
              this.orders = response.data.orders.map(this.getDisplay);
              this.loading = false;
            })
            .catch((e) => {
              console.log(e);
            });
          }else{
            purchaseOrderService.getAll()
              .then((response) => {
                this.orders = response.data.orders.map(this.getDisplay);
                this.loading = false;
              })
              .catch((e) => {
                console.log(e);
              });
          }
        },
        getDisplay(order,index){
        return {
          index: index + 1,
          id: order.id,
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
        editOrder(item){
          this.$router.push({
            name: "EditPurchaseOrder",
            params: { id: item.id },
          });
        },
        addOrder(){
          this.$router.push({path:'/po/new'})
        },
        async printSalesReport(){
          const docDefinition = await salesOrderReport.createSalesReport(this.orders, this.dates);
          const pdf = await pdfMake.createPdf(docDefinition);
          pdf.open();
        }
    }
}
</script>