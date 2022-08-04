<template>
    <div>
    <v-card
    class="d-flex flex-row-reverse"
    flat
    tile
    >
    <v-dialog
        v-model="dialog"
        persistent
        max-width="600px"
        >
        <template v-slot:activator="{ on, attrs }">
            <v-btn
            color="primary"
            dark
            v-bind="attrs"
            v-on="on"
            icon
            >
            <v-icon>mdi-plus</v-icon>
            </v-btn>
        </template>
        <v-card>
            <v-card-title>
            <span class="text-h5">Add Menu</span>
            </v-card-title>
            <v-card-text>
            <v-container>
                <v-row>
                <v-col
                    cols="12"
                >
                    <v-text-field
                    label="Label"
                    required
                    ></v-text-field>
                </v-col>
                <v-col cols="12">
                    <v-text-field
                    label="Route"
                    required
                    ></v-text-field>
                </v-col>
                <v-col cols="12">
                    <v-text-field
                    label="icon"
                    required
                    ></v-text-field>
                </v-col>
                <v-col
                    cols="12"
                >
                    <v-autocomplete
                    :items="entries"
                    label="Parent Menu"
                    :loading="isLoading" 
                    :search-input.sync="search"
                    hide-no-data 
                    hide-selected 
                    item-text="label" 
                    item-value="id"
                    placeholder="Start typing to Search" 
                    prepend-icon="mdi-database-search"
                    return-object
                    ></v-autocomplete>
                </v-col>
                </v-row>
            </v-container>
            <small>*indicates required field</small>
            </v-card-text>
            <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                color="blue darken-1"
                text
                @click="dialog = false"
            >
                Close
            </v-btn>
            <v-btn
                color="blue darken-1"
                text
                @click="dialog = false"
            >
                Save
            </v-btn>
            </v-card-actions>
        </v-card>
        </v-dialog>
    </v-card>
    <v-container>
      <v-layout wrap>
        <v-flex xs12>
            {{ model }}
            <v-autocomplete 
                v-model="model" 
                :items="entries" 
                :loading="isLoading" 
                :search-input.sync="search"
                hide-no-data 
                hide-selected 
                item-text="label" 
                item-value="id" 
                label="Menus" 
                placeholder="Start typing to Search" 
                prepend-icon="mdi-database-search"
                return-object
                chips
                deletable-chips
                multiple
                ></v-autocomplete>
        </v-flex>
        </v-layout>
    </v-container>
    </div>
</template>
<script>
import MenuService from '../services/menuService';
/* eslint-disable */
  export default {
    name:'MenuView',
    data: () => ({
        dialog:false,
        items: [],
        entries: [],
        isLoading: false,
        model: [ { "route": "", "label": "", "icon": "", "subMenu": [], "id": ""} ],
        search: null,
    }),
    async created() {
        try {
            const response = await MenuService.getAllMenu();
            this.items = response.data.menus;
        } catch (err) {
            console.log(err.message);
        }
    },
    watch: {
        search (val) {
        // Items have already been loaded
        if (this.entries.length > 0) return

        // Items have already been requested
        if (this.isLoading) return

        this.isLoading = true

        // Lazily load data menu for autocomplete
        fetch('http://localhost:8000/api/menus')
            .then(res => res.json())
            .then(res => {
            const { menus } = res
            this.entries = menus
            })
            .catch(err => {
            console.log(err)
            })
            .finally(() => (this.isLoading = false))
        }
    }
  }
</script>