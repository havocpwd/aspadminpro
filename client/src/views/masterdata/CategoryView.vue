<template>
    <div>
        <div class="mt-4">
          <v-data-table
              :headers="headers"
              :items="Categories"
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
          <v-icon small class="mr-2" @click="editcategory(item.id)">mdi-pencil</v-icon>
          <v-icon small @click="deletecategory(item.id)">mdi-delete</v-icon>
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
                  @click="newcategory"
                  >
                  <v-icon>mdi-plus-circle</v-icon>
                  </v-btn>
              </template>
              <v-card>
                  <v-card-title>
                  <span class="text-h5" v-if="editedMode">Edit Category</span>
                  <span class="text-h5" v-else>Tambah Category</span>
                  </v-card-title>
                  <v-card-text>
                  <v-container>
                      <v-form ref="form" lazy-validation>
                        <v-text-field
                          v-model="category.code"
                          :rules="[(v) => !!v || 'Iso Code is required']"
                          label="Iso Code"
                          required
                      ></v-text-field>
                      <v-text-field
                          v-model="category.desc"
                          :rules="[(v) => !!v || 'Description is required']"
                          label="Desc"
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
                      @click="savecategory(editedMode)"
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
import categoryService from '@/services/categoryService';

  export default {
    data: () => ({
        dialog: false,
        dialogTitle : "",
        btnTitle: "",
        submitted: false,
        editedMode: undefined,
        search: '',
        headers: [
          { text: 'Code',align: 'start', value: 'code',class: "primary"},
          { text: 'Desc', value: 'desc',class: "primary" },
          { text: "Actions", value: "actions", sortable: false ,class: "primary"},
        ],
        Categories:[],
        category: {
          code: "",
          desc:"",
        },
        
    }),
    mounted() {
      this.retrieveCategories();
    },
    methods:{
      retrieveCategories() {
        categoryService.getAll()
          .then((response) => {
            this.Categories = response.data.categories.map(this.getDisplayCategories);
          })
          .catch((e) => {
            console.log(e);
          });
      },
      refreshList() {
        this.retrieveCategories();
      },
      getDisplayCategories(category){
        return {
          id: category.id,
          code: category.code,
          desc: category.desc,
        }
      },

      savecategory(id) {
        var data = {
          code: this.category.code,
          desc: this.category.desc,
        };
        console.log(data);
        if (id) 
        {
          categoryService.update(id, data)
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
          categoryService.create(data)
            .then((response) => {
              console.log(response.data);
              this.submitted = true;
              this.refreshList();
              this.clearcategory();
              this.closeDialog();
            })
            .catch((e) => {
              console.log(e);
          });
        }
      },
      
      editcategory(id) {
        this.editedMode = id;
        categoryService.get(id)
        .then((response) => {
          this.category = {
            code: response.data.code,
            desc:response.data.desc,
          }
          this.dialog = true
        })
        .catch((e) => {
          console.log(e);
        })
      },
      deletecategory(id) {
        categoryService.delete(id)
          .then(() => {
            this.refreshList();
          })
          .catch((e) => {
            console.log(e);
          });
      },
      newcategory() {
        this.submitted = false;
        this.dialog = true;
        this.clearcategory();
      },
      clearcategory(){
        this.category = {
          code: "",
          desc:"",
        }
      },
      closeDialog(){
        this.dialog = false,
        this.editedMode = undefined,
        this.clearcategory();
      }

    }
  }
</script>