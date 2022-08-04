<template>
<v-container class="full-height" fluid>
<v-data-table
    :headers="headers"
    :options="tableOptions"
    :footer-props="{'items-per-page-options':[15, 30, 50, 100, -1]}"
    :items="orders"
    :search="search"
    :items-per-page="30"
    class="elevation-1"
    :loading ="loading"
    loading-text="Loading... Please wait"
    dense
    :hide-default-footer="true"
>
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
        <v-btn
        color="primary"
        dark
        icon
        @click="printReport"
        >
        <v-icon>mdi-printer</v-icon>
        </v-btn>
  </v-toolbar>
</template>
</v-data-table>
</v-container>
</template>

<script>
/* eslint-disable */
import reportService from '@/services/reportService';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import salesReport from "@/reports/sales_report_2";

export default {
    data: () => ({
        loading: false,
        search:'',
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
          { text: 'Diskon', value: 'discount',class: "primary" },
          { text: 'Ongkos Kirim', value: 'deliveryFee',class: "primary" },
          { text: 'HPP', value: 'cogsTotal',class: "primary" },
          { text: 'Total', value: 'grandTotal',class: "primary" }
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
      retrieveorders(){
        reportService.getOrdersReports(this.dates[0],this.dates[1])
        .then((response) => {
          this.loading = false;
          this.orders = response.data.orders.map(this.getDisplay);
        })
        .catch((e) => {
          console.log(e);
        });
      },
      getDisplay(order,index){
      return {
        index: index + 1,
        id: order.id,
        orderNo: order.orderNo,
        dateIssued: this.$moment(order.dateIssued,'YYYY-MM-DD').format('LL'),
        partner: order.partners,
        deliverTo: order.deliverTo,
        deliveryFee: order.deliveryFee,
        discount: order.discount,
        note: order.note,
        payment:order.payments,
        grandTotal: order.grandTotal,
        cogsTotal: order.cogsTotal,
        orderDetailTotal: order.orderDetailTotal
        }
      },
      async printReport(){
          const docDefinition = await salesReport.createSalesReport(this.orders, this.dates);
          const pdf = await pdfMake.createPdf(docDefinition);
          pdf.open();
        }
    }
}
</script>