<template>
<div>
    <div class="mt-4">
      <v-data-table
          :headers="headers"
          :items="partners"
          :search="search"
          :items-per-page="10"
          class="elevation-1"
      >
      <template v-slot:[`item.actions`]="{ item }">
              <v-icon small class="mr-2" @click="editPartner(item.id)">mdi-pencil</v-icon>
              <v-icon small @click="deletePartner(item.id)">mdi-delete</v-icon>
            </template>
            <template v-slot:top>
              <v-toolbar flat>
                  <v-text-field
                      hide-details
                      append-icon="mdi-magnify"
                      label="Search"
                      single-line
                      v-model="search"
                      class="shrink"
                  ></v-text-field>
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
                        @click="newPartner"
                        >
                        <v-icon>mdi-plus-circle</v-icon>
                        </v-btn>
                    </template>
                    <v-card>
                        <v-card-title>
                        <span class="text-h5" v-if="editedMode">Edit Supplier</span>
                        <span class="text-h5" v-else>Tambah Supplier</span>
                        </v-card-title>
                        <v-card-text>
                        <v-container>
                            <v-form ref="form" lazy-validation>
                              <v-text-field
                                v-model="partner.first_name"
                                :rules="[(v) => !!v || 'First Name is required']"
                                label="First Name"
                                required
                              ></v-text-field>
                              <v-text-field
                                v-model="partner.last_name"
                                label="Last Name"
                              ></v-text-field>
                              <v-text-field
                                v-model="partner.email"
                                label="Email"
                              ></v-text-field>
                              <v-text-field
                                v-model="partner.phone"
                                label="Phone"
                              ></v-text-field>
                              <v-text-field
                                v-model="partner.address.street"
                                label="Street"
                              ></v-text-field>
                              <v-text-field
                                v-model="partner.address.city"
                                label="City"
                              ></v-text-field>
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
                            @click="savePartner(editedMode)"
                        >
                            Save
                        </v-btn>
                        </v-card-actions>
                    </v-card>
                    </v-dialog>
                    <v-btn
                    color="primary"
                    dark
                    icon
                    >
                    <v-icon>mdi-printer</v-icon>
                    </v-btn>
                </v-toolbar>
              </template>
      </v-data-table>
    </div>
</div>
</template>

<script>
import supplierService from '@/services/supplierService';

  export default {
    data: () => ({
        dialog: false,
        dialogTitle : "",
        btnTitle: "",
        submitted: false,
        editedMode: undefined,
        search: '',
        headers: [
          { text: 'Name',align: 'start', value: 'name',class: "primary"},
          { text: 'Email', value: 'email',class: "primary" },
          { text: 'Phone', value: 'phone',sortable: false,class: "primary" },
          { text: 'Address', value: 'adress',class: "primary" },
          { text: "Actions", value: "actions", sortable: false ,class: "primary"},
        ],
        partners:[],
        partner: {
          first_name:"",
          last_name: "",
          email: "",
          phone: "",
          address: {
            street: "",
            city: "",
          }
        }
    }),
    mounted() {
      this.retrievePartners();
    },
    methods:{
      retrievePartners() {
        supplierService.getAll()
          .then((response) => {
            this.partners = response.data.partners.map(this.getDisplayPartners);
          })
          .catch((e) => {
            console.log(e);
          });
      },
      refreshList() {
        this.retrievePartners();
      },
      getDisplayPartners(partner){
        return {
          id: partner.id,
          name: partner.first_name + " " + partner.last_name,
          email: partner.email,
          phone: partner.phone,
          adress: partner.address.street + " " + partner.address.city,
        }
      },

      savePartner(id) {
        var data = {
          first_name: this.partner.first_name,
          last_name: this.partner.last_name,
          email: this.partner.email,
          phone: this.partner.phone,
          type: "Supplier",
          address: {
            street: this.partner.address.street,
            city: this.partner.address.city
          }
        };
        if (id) 
        {
          supplierService.update(id, data)
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
          supplierService.create(data)
            .then((response) => {
              console.log(response.data);
              this.submitted = true;
              this.refreshList();
              this.clearPartner();
              this.closeDialog();
            })
            .catch((e) => {
              console.log(e);
          });
        }
      },
      
      editPartner(id) {
        this.editedMode = id;
        supplierService.get(id)
        .then((response) => {
          this.partner = {
            first_name:response.data.first_name,
            last_name: response.data.last_name,
            email: response.data.email,
            phone: response.data.phone,
            address: {
              street: response.data.address.street,
              city: response.data.address.city,
            }
          }
          this.dialog = true
        })
        .catch((e) => {
          console.log(e);
        })
      },
      deletePartner(id) {
        supplierService.delete(id)
          .then(() => {
            this.refreshList();
          })
          .catch((e) => {
            console.log(e);
          });
      },
      newPartner() {
        this.submitted = false;
        this.dialog = true;
        this.clearPartner();
      },
      clearPartner(){
        this.partner = {
          first_name:"",
          last_name: "",
          email: "",
          phone: "",
          address: {
            street: "",
            city: "",
          }
        }
      },
      closeDialog(){
        this.dialog = false,
        this.editedMode = undefined,
        this.clearPartner();
      }

    }
  }
</script>