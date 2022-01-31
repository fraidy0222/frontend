<template>
  <div>
    <v-data-table
      item-key="name"
      class="elevation-1"
      :search="search"
      no-results-text="No exite este elemento"
      :loading="loading"
      disable-sort
      loading-text="Cargando... Por favor espere"
      :headers="headers"
      :items="entidad"
      :items-per-page="10"
      :footer-props="{
        'items-per-page-options': [10, 15, 20],
        'items-per-page-text': 'Módulos por páginas',
      }"
    >
      <template v-slot:[`item.logo`]="{ item }">
        <v-avatar size="40">
          <v-img :src="item.logo">
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular
                  indeterminate
                  color="blue"
                ></v-progress-circular>
              </v-row>
            </template>
          </v-img>
        </v-avatar>
      </template>
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Módulos</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog persistent v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                <v-icon>mdi-plus</v-icon>
                Añadir
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>
              <v-form v-model="valid" @submit.stop.prevent="save">
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12">
                        <v-text-field
                          v-model="editedItem.nombre"
                          label="Nombre"
                          :rules="[rules.required]"
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12">
                        <v-file-input
                          accept="image/*"
                          label="File input"
                          v-model="editedItem.logo"
                        ></v-file-input>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="red darken-1" outlined @click="close">
                    Cancelar
                  </v-btn>
                  <v-btn
                    color="primary"
                    :disabled="!valid"
                    type="submit"
                    @click.prevent="save"
                  >
                    Guardar
                  </v-btn>
                </v-card-actions>
              </v-form>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="headline"
                >¿Estás seguro de borrar este registro de <br />
                forma permanente?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn outlined @click="closeDelete">Cancelar</v-btn>
                <v-btn depressed color="error" @click="deleteItemConfirm"
                  >Borrar</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
        <!-- Buscar -->
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Buscar..."
          single-line
          hide-details
          class="mx-4"
        ></v-text-field>
        <!-- end Buscar -->
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on" icon>
              <v-icon color="warning" class="mr-2" @click="editItem(item)">
                mdi-pencil
              </v-icon>
            </v-btn>
          </template>
          <span>Editar</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on" icon>
              <v-icon color="error" @click="deleteItem(item)">
                mdi-delete
              </v-icon>
            </v-btn>
          </template>
          <span>Eliminar</span>
        </v-tooltip>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize"> Reinicar </v-btn>
      </template>
    </v-data-table>
    <v-snackbar top v-model="snackbar" :color="snackColor" :timeout="timeout">
      <v-icon
        v-bind:class="[icon ? 'mdi-check-circle' : 'mdi-bell-cancel', 'mdi']"
      ></v-icon>
      {{ text }}
      <template v-slot:action="{ attrs }">
        <v-btn
          color="white"
          text
          v-bind="attrs"
          icon
          dark
          @click="snackbar = false"
        >
          <v-icon>mdi-close-circle</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    search: "",
    dialog: false,
    loading: false,
    dialogDelete: false,
    text: "",
    snackbar: false,
    snackColor: "",
    timeout: 2000,
    success: "",
    error: "",
    icon: true,
    show: false,
    show1: false,
    aplicacion: [],
    rules: {
      required: (v) => !!v || "Este campo es requerido",
    },
    valid: true,
    headers: [
      {
        text: "ID",
        align: "start",
        sortable: false,
        value: "id",
      },
      { text: "Nombre", value: "nombre" },
      { text: "Logo", value: "logo" },
      { text: "Acciones", value: "actions", sortable: false },
    ],
    entidad: [],
    editedIndex: -1,
    editedItem: {
      id: "",
      nombre: "",
      logo: null,
    },
    defaultItem: {
      id: "",
      nombre: "",
      logo: null,
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nueva Entidad" : "Editar Entidad";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    async initialize() {
      axios.interceptors.request.use(
        (config) => {
          this.loading = true;
          return config;
        },
        (error) => {
          // Do something with request error
          return Promise.reject(error);
        }
      );

      // Add a response interceptor
      axios.interceptors.response.use(
        (response) => {
          this.loading = false;
          return response;
        },
        (error) => {
          this.loading = false;
          return Promise.reject(error);
        }
      );
      await axios
        .get("http://localhost:8000/api/v1.0/administracion/entidad/")
        .then((res) => {
          this.entidad = res.data;
          // console.log(res.data);
        })
        .catch((err) => console.log(err));
    },

    editItem(item) {
      this.editedIndex = this.entidad.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.entidad.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    async deleteItemConfirm() {
      await axios
        .delete(
          `http://localhost:8000/api/v1.0/administracion/entidad/${this.editedItem.id}/`
        )
        .then((res) => {
          this.entidad.splice(this.editedIndex, 1);
          (this.snackbar = true),
            (this.text = "Módulo eliminado"),
            (this.snackColor = "success");
          this.icon = true;
        })
        .catch((err) => {
          (this.snackbar = true),
            (this.text = "No se ha podido eliminar"),
            (this.snackColor = "error");
          this.icon = false;
        });
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    async save() {
      if (this.editedIndex > -1) {
        await axios
          .put(
            `http://localhost:8000/api/v1.0/administracion/entidad/${this.editedItem.id}/`,
            this.editedItem
          )
          .then((res) => {
            this.initialize();
            (this.snackbar = true),
              (this.text = "Aplicación editada"),
              (this.snackColor = "success");
            this.icon = true;
          })
          .catch((err) => {
            (this.snackbar = true),
              (this.text = "No se ha podido editar la aplicación"),
              (this.snackColor = "error");
            this.icon = false;
          });
      } else {
        await axios
          .post(
            `http://localhost:8000/api/v1.0/administracion/entidad/`,
            this.editedItem
          )
          .then((res) => {
            this.entidad.push(res.data);
            (this.snackbar = true),
              (this.text = "Aplicación añadida"),
              (this.snackColor = "success");
            this.icon = true;
          })
          .catch((err) => {
            (this.snackbar = true),
              (this.text = "No se ha podido crear la aplicación"),
              (this.snackColor = "error");
            this.icon = false;
          });
      }
      this.close();
    },
  },
};
</script>
