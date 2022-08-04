<template>
    <div>
        <div class="mt-4">
          <v-data-table
              :headers="headers"
              :items="Currencies"
              :items-per-page="10"
              class="elevation-1"
          >
          <template v-slot:[`item.rate`]="{ item }">
          <v-text-field rounded
          v-model="item.rate"
          ></v-text-field>
          </template>
          <template v-slot:[`item.default`]="{ item }">
          <v-checkbox
          v-model="item.default"
          ></v-checkbox>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
          <v-icon small @click="retrieveRates(item.code, item)">mdi-currency-twd</v-icon>
          <v-icon small class="mr-2" @click="editcurrency(item.id)">mdi-pencil</v-icon>
          <v-icon small @click="deletecurrency(item.id)">mdi-delete</v-icon>
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
                    @click="newcurrency"
                    >
                    <v-icon>mdi-plus-circle</v-icon>
                    </v-btn>
                </template>
                <v-card>
                    <v-card-title>
                    <span class="text-h5" v-if="editedMode">Edit currency</span>
                    <span class="text-h5" v-else>Tambah currency</span>
                    </v-card-title>
                    <v-card-text>
                    <v-container>
                        <v-form ref="form" lazy-validation>
                        <v-text-field
                        v-model="currency.code"
                        :rules="[(v) => !!v || 'Code is required']"
                        label="Code"
                        required
                        ></v-text-field>
                        <v-text-field
                            v-model="currency.desc"
                            :rules="[(v) => !!v || 'Description is required']"
                            label="Desc"
                            required
                        ></v-text-field>
                        <v-text-field
                            v-model="currency.symbol"
                            label="Symbol"
                        ></v-text-field>
                        <v-text-field
                            v-model="currency.country"
                            label="Countr"
                        ></v-text-field>
                        <v-text-field
                            v-model="currency.rate"
                            label="Rate"
                        ></v-text-field>
                        <v-checkbox
                        v-model="currency.default"
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
                        @click="savecurrency(editedMode)"
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
import currencyService from '@/services/currencyService';

  export default {
    data: () => ({
        dialog: false,
        dialogTitle : "",
        btnTitle: "",
        submitted: false,
        editedMode: undefined,
        headers: [
          { text: 'Code',align: 'start', value: 'code',class: "primary"},
          { text: 'Desc', value: 'desc',class: "primary" },
          { text: 'Symbol', value: 'symbol',sortable: false,class: "primary" },
          { text: 'Country', value: 'country',class: "primary" },
          { text: 'Rate', value: 'rate',class: "primary" },
          { text: 'Default', value: 'default',class: "primary" },
          { text: "Actions", value: "actions", sortable: false ,class: "primary"},
        ],
        Currencies:[],
        currency: {
          code:"",
          desc: "",
          symbol: "",
          country: "",
          rate: "",
          default: false,
        },
        
    }),
    mounted() {
      this.retrieveCurrencies();
    },
    methods:{
      retrieveCurrencies() {
        currencyService.getAll()
          .then((response) => {
            this.Currencies = response.data.currencies.map(this.getDisplayCurrencies);
          })
          .catch((e) => {
            console.log(e);
          });
      },
      refreshList() {
        this.retrieveCurrencies();
      },
      getDisplayCurrencies(currency){
        return {
          id: currency.id,
          code: currency.code,
          desc: currency.desc,
          symbol: currency.symbol,
          country: currency.country,
          rate: currency.rate,
          default: currency.default,
        }
      },
      retrieveRates(curencyCode, item){
        currencyService.getExchangeRate()
          .then((response) => {
            var currencyRate = response.data.filter(x => x.mata_uang == curencyCode);
            var data = {
              code: item.code,
              desc: item.desc,
              symbol: item.symbol,
              country: item.country,
              rate: parseFloat(currencyRate[0].eRate.eRate_beli),
              default: item.default,
              };
            currencyService.update(item.id,data)
              .then((response) => {
                this.refreshList();
                console.log(response.data.message);
              });
          })
          .catch((e) => {
            console.log(e);
          });
      },
      savecurrency(id) {
        var data = {
          code: this.currency.code,
          desc: this.currency.desc,
          symbol: this.currency.symbol,
          country: this.currency.country,
          rate: this.currency.rate,
          default: this.currency.default,
        };
        console.log(data);
        if (id) 
        {
          currencyService.update(id, data)
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
          currencyService.create(data)
            .then((response) => {
              console.log(response.data);
              this.submitted = true;
              this.refreshList();
              this.clearcurrency();
              this.closeDialog();
            })
            .catch((e) => {
              console.log(e);
          });
        }
      },
      
      editcurrency(id) {
        this.editedMode = id;
        currencyService.get(id)
        .then((response) => {
          this.currency = {
            code:response.data.code,
            desc:response.data.desc,
            symbol:response.data.symbol,
            country:response.data.country,
            rate: response.data.rate,
            default: response.data.default,
          }
          this.dialog = true
        })
        .catch((e) => {
          console.log(e);
        })
      },
      deletecurrency(id) {
        currencyService.delete(id)
          .then(() => {
            this.refreshList();
          })
          .catch((e) => {
            console.log(e);
          });
      },
      newcurrency() {
        this.submitted = false;
        this.dialog = true;
        this.clearcurrency();
      },
      clearcurrency(){
        this.currency = {
          code:"",
          desc: "",
          symbol: "",
          country: "",
          rate: "",
          default: false,
        }
      },
      closeDialog(){
        this.dialog = false,
        this.editedMode = undefined,
        this.clearcurrency();
      }

    }
  }
</script>