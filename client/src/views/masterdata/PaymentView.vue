<template>
    <div>
        <div class="mt-4">
          <v-data-table
              :headers="headers"
              :items="Payments"
              :search="search"
              :items-per-page="10"
              class="elevation-1"
          >
          <template v-slot:[`item.default`]="{ item }">
          <v-checkbox
          v-model="item.default"
          ></v-checkbox>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
          <v-icon small class="mr-2" @click="editpayment(item.id)">mdi-pencil</v-icon>
          <v-icon small @click="deletepayment(item.id)">mdi-delete</v-icon>
          </template>
          <template v-slot:top>
            <v-toolbar flat>
              <v-spacer></v-spacer>
              <v-dialog
                v-model="dialog"
                persistent
                max-width="900px"
                >
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                    color="primary"
                    dark
                    v-bind="attrs"
                    v-on="on"
                    icon
                    @click="newpayment"
                    >
                    <v-icon>mdi-plus-circle</v-icon>
                    </v-btn>
                </template>
                <v-card>
                    <v-card-title>
                    <span class="text-h5" v-if="editedMode">Edit Payment</span>
                    <span class="text-h5" v-else>Tambah Payment</span>
                    </v-card-title>
                    <v-card-text>
                    <v-container>
                        <v-form ref="form" lazy-validation>
                        <v-text-field
                            v-model="payment.desc"
                            :rules="[(v) => !!v || 'Description is required']"
                            label="Desc"
                            required
                        ></v-text-field>
                        <v-text-field
                            v-model="payment.duedate"
                            label="Due Date"
                        ></v-text-field>
                          <v-select
                        v-model="payment.type"
                        :items="types"
                        :rules="[v => !!v || 'Type is required']"
                        label="Type"
                        required
                        ></v-select>
                        <v-checkbox
                        v-model="payment.default"
                        label="Default"
                        ></v-checkbox>
                        </v-form>
                    </v-container>
                    <small>*masukan data dengan benar</small>
                    </v-card-text>
                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="blue darken-1"
                        text
                        @click="closeDialog"
                    >
                        Close
                    </v-btn>
                    <v-btn
                        color="blue darken-1"
                        text
                        @click="savepayment(editedMode)"
                    >
                        Save
                    </v-btn>
                    </v-card-actions>
                </v-card>
                </v-dialog>
            </v-toolbar>
          </template>
          </v-data-table>
        </div>
    </div>
</template>

<script>
import PaymentService from '@/services/paymentService';

  export default {
    data: () => ({
        dialog: false,
        dialogTitle : "",
        btnTitle: "",
        submitted: false,
        editedMode: undefined,
        search: '',
        headers: [
          { text: 'Desc',align: 'start', value: 'desc',class: "primary"},
          { text: 'Type', value: 'type',class: "primary" },
          { text: 'Due Date', value: 'duedate',sortable: false,class: "primary" },
          { text: 'default', value: 'default',class: "primary" },
          { text: "Actions", value: "actions", sortable: false ,class: "primary"},
        ],
        Payments:[],
        payment: {
          desc:"",
          type: "",
          duedate: "",
          default: false,
        },
        types: ['Cash', 'Kredit'],
        
    }),
    mounted() {
      this.retrievePayments();
    },
    methods:{
      retrievePayments() {
        PaymentService.getAll()
          .then((response) => {
            this.Payments = response.data.payments.map(this.getDisplayPayments);
          })
          .catch((e) => {
            console.log(e);
          });
      },
      refreshList() {
        this.retrievePayments();
      },
      getDisplayPayments(payment){
        return {
          id: payment.id,
          desc: payment.desc,
          type: payment.type,
          duedate: payment.duedate,
          default: payment.default,
        }
      },

      savepayment(id) {
        var data = {
          desc: this.payment.desc,
          type: this.payment.type,
          duedate: this.payment.duedate,
          default: this.payment.default,
        };
        console.log(data);
        if (id) 
        {
          PaymentService.update(id, data)
          .then((response) => {
            console.log(response.data.message);
            this.refreshList();
            this.closeDialog();
          })
          .catch((e) => {
            console.log(e)
          });
        }
        else
        {
          PaymentService.create(data)
            .then((response) => {
              console.log(response.data);
              this.submitted = true;
              this.refreshList();
              this.clearpayment();
              this.closeDialog();
            })
            .catch((e) => {
              console.log(e);
          });
        }
      },
      
      editpayment(id) {
        this.editedMode = id;
        PaymentService.get(id)
        .then((response) => {
          this.payment = {
            desc:response.data.desc,
            type: response.data.type,
            duedate: response.data.duedate,
            default: response.data.default,
          }
          this.dialog = true
        })
        .catch((e) => {
          console.log(e);
        })
      },
      deletepayment(id) {
        PaymentService.delete(id)
          .then(() => {
            this.refreshList();
          })
          .catch((e) => {
            console.log(e);
          });
      },
      newpayment() {
        this.submitted = false;
        this.dialog = true;
        this.clearpayment();
      },
      clearpayment(){
        this.payment = {
          desc:"",
          type: "",
          duedate: "",
          default: false,
        }
      },
      closeDialog(){
        this.dialog = false,
        this.editedMode = undefined,
        this.clearpayment();
      }

    }
  }
</script>