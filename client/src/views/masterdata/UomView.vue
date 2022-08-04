<template>
    <div>
        <div class="mt-4">
          <v-data-table
              :headers="headers"
              :items="Uoms"
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
          <v-icon small class="mr-2" @click="edituom(item.id)">mdi-pencil</v-icon>
          <v-icon small @click="deleteuom(item.id)">mdi-delete</v-icon>
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
                      @click="newuom"
                      >
                      <v-icon>mdi-plus-circle</v-icon>
                      </v-btn>
                  </template>
                  <v-card>
                      <v-card-title>
                      <span class="text-h5" v-if="editedMode">Edit uom</span>
                      <span class="text-h5" v-else>Tambah uom</span>
                      </v-card-title>
                      <v-card-text>
                      <v-container>
                          <v-form ref="form" lazy-validation>
                          <v-text-field
                              v-model="uom.desc"
                              :rules="[(v) => !!v || 'Description is required']"
                              label="Desc"
                              required
                          ></v-text-field>
                          <v-text-field
                              v-model="uom.code"
                              :rules="[(v) => !!v || 'Iso Code is required']"
                              label="Iso Code"
                              required
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
                          @click="saveuom(editedMode)"
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
import uomService from '@/services/uomService';

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
          { text: 'Iso Code', value: 'code',class: "primary" },
          { text: "Actions", value: "actions", sortable: false ,class: "primary"},
        ],
        Uoms:[],
        uom: {
          desc:"",
          code: "",
        },
        
    }),
    mounted() {
      this.retrieveUoms();
    },
    methods:{
      retrieveUoms() {
        uomService.getAll()
          .then((response) => {
            this.Uoms = response.data.uom.map(this.getDisplayUoms);
          })
          .catch((e) => {
            console.log(e);
          });
      },
      refreshList() {
        this.retrieveUoms();
      },
      getDisplayUoms(uom){
        return {
          id: uom.id,
          desc: uom.desc,
          code: uom.code,
        }
      },

      saveuom(id) {
        var data = {
          desc: this.uom.desc,
          code: this.uom.code,
        };
        console.log(data);
        if (id) 
        {
          uomService.update(id, data)
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
          uomService.create(data)
            .then((response) => {
              console.log(response.data);
              this.submitted = true;
              this.refreshList();
              this.clearuom();
              this.closeDialog();
            })
            .catch((e) => {
              console.log(e);
          });
        }
      },
      
      edituom(id) {
        this.editedMode = id;
        uomService.get(id)
        .then((response) => {
          this.uom = {
            desc:response.data.desc,
            code: response.data.code,
          }
          this.dialog = true
        })
        .catch((e) => {
          console.log(e);
        })
      },
      deleteuom(id) {
        uomService.delete(id)
          .then(() => {
            this.refreshList();
          })
          .catch((e) => {
            console.log(e);
          });
      },
      newuom() {
        this.submitted = false;
        this.dialog = true;
        this.clearuom();
      },
      clearuom(){
        this.uom = {
          desc:"",
          code: "",
        }
      },
      closeDialog(){
        this.dialog = false,
        this.editedMode = undefined,
        this.clearuom();
      }

    }
  }
</script>