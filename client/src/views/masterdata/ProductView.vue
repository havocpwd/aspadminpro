<template>
    <div>
        <div class="mt-4">
          <v-data-table
              :headers="headers"
              :items="products"
              :search="search"
              :items-per-page="10"
              class="elevation-1"
          >
          <template v-slot:[`item.actions`]="{ item }">
          <v-icon small class="mr-2" @click="editproduct(item.id)">mdi-pencil</v-icon>
          <v-icon small @click="deleteproduct(item.id)">mdi-delete</v-icon>
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
                    @click="newproduct"
                    >
                    <v-icon>mdi-plus-circle</v-icon>
                    </v-btn>
                </template>
                <v-card>
                    <v-card-title>
                    <span class="text-h5" v-if="editedMode">Edit Product</span>
                    <span class="text-h5" v-else>Tambah Product</span>
                    </v-card-title>
                    <v-card-text>
                    <v-container>
                        <v-form ref="form" lazy-validation>
                        <v-text-field
                            v-model="product.keyname"
                            :rules="[(v) => !!v || 'Description is required']"
                            label="Keyname"
                            required
                            outlined
                        ></v-text-field>
                        <v-text-field
                            v-model="product.desc"
                            :rules="[(v) => !!v || 'Description is required']"
                            label="Desc"
                            required
                            outlined
                        ></v-text-field>
                        <v-select
                        v-model="product.uomId"
                        :items="uoms"
                        item-text = "code"
                        item-value = "id"
                        :rules="[v => !!v || 'Uom is required']"
                        label="Uom"
                        required
                        outlined
                        ></v-select>
                        <v-select
                        v-model="product.categoryId"
                        :items="categories"
                        item-text = "desc"
                        item-value = "id"
                        :rules="[v => !!v || 'Category is required']"
                        label="Category"
                        required
                        outlined
                        ></v-select>
                        <v-text-field
                            v-model="product.purchase_price"
                            label="Purchase Price"
                            outlined
                        ></v-text-field>
                        <v-text-field
                            v-model="product.sales_price"
                            label="Sales Price"
                            outlined
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
                        @click="saveproduct(editedMode)"
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
import productService from '@/services/productService';
import uomService from '@/services/uomService';
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
          { text: 'Keyname', value: 'keyname',class: "primary"},
          { text: 'Desc',align: 'start', value: 'desc',class: "primary"},
          { text: 'Uom', value: 'uoms',class: "primary" },
          { text: 'Category', value: 'categories',class: "primary" },
          { text: 'Purchase Price', value: 'purchase_price',class: "primary" },
          { text: 'Sales Price', value: 'sales_price',class: "primary" },
          { text: "Actions", value: "actions", sortable: false ,class: "primary"},
        ],
        products:[],
        uoms: [],
        categories: [],
        product: {
          keyname:"",
          desc:"",
          uomId: "",
          categoryId: "",
          purchase_price: "",
          sales_price: "",
        },
        
    }),
    mounted() {
      this.refreshList();
    },
    methods:{
      retrieveproducts() {
        productService.getAll()
          .then((response) => {
            this.products = response.data.products.map(this.getDisplayproducts);
          })
          .catch((e) => {
            console.log(e);
          });
      },
      retrieveuoms() {
        uomService.getAll()
          .then((response) => {
            this.uoms = response.data.uom;
          })
      },
      retrievecategories() {
        categoryService.getAll()
          .then((response) => {
            this.categories = response.data.categories;
          })
      },
      refreshList() {
        this.retrieveproducts();
        this.retrieveuoms();
        this.retrievecategories();
      },
      getDisplayproducts(product){
        return {
          id: product.id,
          keyname: product.keyname,
          desc: product.desc,
          uoms: product.uoms.code,
          categories: product.categories.desc,
          purchase_price: new Intl.NumberFormat('id', { style: 'currency', currency: 'IDR' }).format(product.purchase_price),
          sales_price: new Intl.NumberFormat('id', { style: 'currency', currency: 'IDR' }).format(product.sales_price),
        }
      },

      saveproduct(id) {
        var data = {
          keyname: this.product.keyname,
          desc: this.product.desc,
          uomId: this.product.uomId,
          categoryId: this.product.categoryId,
          purchase_price: this.product.purchase_price,
          sales_price: this.product.sales_price,
        };
        if (id) 
        {
          productService.update(id, data)
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
          productService.create(data)
            .then(() => {
              this.submitted = true;
              this.refreshList();
              this.clearproduct();
              this.closeDialog();
            })
            .catch((e) => {
              console.log(e);
          });
        }
      },
      
      editproduct(id) {
        this.editedMode = id;
        productService.get(id)
        .then((response) => {
          this.product = {
            keyname: response.data.keyname,
            desc: response.data.desc,
            uomId: response.data.uoms,
            categoryId: response.data.categories,
            purchase_price: response.data.purchase_price,
            sales_price: response.data.sales_price,
          }
          console.log(this.product);
          this.dialog = true
        })
        .catch((e) => {
          console.log(e);
        })
      },
      deleteproduct(id) {
        productService.delete(id)
          .then(() => {
            this.refreshList();
          })
          .catch((e) => {
            console.log(e);
          });
      },
      newproduct() {
        this.submitted = false;
        this.dialog = true;
        this.product = {
          keyname : Math.floor(new Date().valueOf() * Math.random()),
        }
      },
      clearproduct(){
        this.product = {
          keyname:"",
          desc:"",
          uomId: "",
          categoryId: "",
          purchase_price: "",
          sales_price: "",
        }
      },
      closeDialog(){
        this.dialog = false,
        this.editedMode = undefined,
        this.clearproduct();
      }

    }
  }
</script>