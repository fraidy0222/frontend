<template>
  <div>
    <v-row justify="start">
      <v-col cols="12" sm="4">
        <v-select outlined label="Selecione la entidad"></v-select>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6">
          <v-data-table
            :headers="headers"
            :items="departamento"
            item-key="id"
            :search="search"
            no-results-text="No exite este elemento"
            :loading="loading"
            disable-sort
            :items-per-page="10"
            :footer-props="{
              'items-per-page-options': [10, 15, 20],
              'items-per-page-text': 'Departamentos por páginas',
            }"
            v-model="selectedRows"
            class="elevation-1">
              <template v-slot:item="{ item }">
                <tr :class="selectedRows.indexOf(item.id)>-1 ? 'red' : ''" @click="rowClicked(item)">
                    <td>{{item.id}}</td>
                    <td>{{item.nombre}}</td>
                    <td>
                      <v-btn icon>
                        <v-icon color="warning" class="mr-2" @click="editItem(item)">
                          mdi-pencil
                        </v-icon>
                      </v-btn>
                      <v-btn icon>
                        <v-icon color="error" @click="deleteItem(item)">
                          mdi-delete
                        </v-icon>
                      </v-btn>
                    </td>
                </tr>
            </template>
            <template v-slot:top>
               <v-toolbar flat>
            <v-toolbar-title>Departamento</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
             <v-dialog persistent v-model="dialog" max-width="500px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="primary"
                    dark
                    class="mb-2"
                    v-bind="attrs"
                    v-on="on"
                  >
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
          </v-toolbar>
            <!-- Buscar Departemento -->
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Buscar..."
              single-line
              hide-details
              class="mx-4"
            ></v-text-field>
            </template>
          </v-data-table>
          <v-dialog v-model="dialogDelete" max-width="500px">
                <v-card>
                  <v-card-title class="headline"
                    >¿Estás seguro de borrar este registro de <br />
                    forma permanente?
                  </v-card-title>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn outlined @click="closeDelete">Cancelar</v-btn>
                    <v-btn depressed color="error" @click="deleteItemConfirm"
                      >Borrar
                    </v-btn>
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
          </v-dialog>
      </v-col>
      <v-col cols="12" sm="6">
        <v-data-table
          item-key="id"
          class="elevation-1"
          :search="search2"
          no-results-text="No exite este elemento"
          :loading="loading"
          disable-sort
          loading-text="Cargando... Por favor espere"
          :headers="headers2"
          :items="area"
          :items-per-page="10"
          :footer-props="{
            'items-per-page-options': [10, 15, 20],
            'items-per-page-text': 'Área por páginas',
          }"
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>Área</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>
              <v-dialog persistent v-model="dialog2" max-width="500px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="primary"
                    dark
                    class="mb-2"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon>mdi-plus</v-icon>
                    Añadir
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="headline">{{ formTitle2 }}</span>
                  </v-card-title>
                  <v-form v-model="valid2" @submit.stop.prevent="save2">
                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12">
                            <v-text-field
                              v-model="editedItem2.nombre"
                              label="Nombre"
                              :rules="[rules.required]"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="red darken-1" outlined @click="close2">
                        Cancelar
                      </v-btn>
                      <v-btn
                        color="primary"
                        :disabled="!valid2"
                        type="submit"
                        @click.prevent="save2"
                      >
                        Guardar
                      </v-btn>
                    </v-card-actions>
                  </v-form>
                </v-card>
              </v-dialog>
              <v-dialog v-model="dialogDelete2" max-width="500px">
                <v-card>
                  <v-card-title class="headline"
                    >¿Estás seguro de borrar este registro de <br />
                    forma permanente?
                  </v-card-title>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn outlined @click="closeDelete2">Cancelar</v-btn>
                    <v-btn depressed color="error" @click="deleteItemConfirm2"
                      >Borrar
                    </v-btn>
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
            <!-- Buscar -->
            <v-text-field
              v-model="search2"
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
                  <v-icon color="warning" class="mr-2" @click="editItem2(item)">
                    mdi-pencil
                  </v-icon>
                </v-btn>
              </template>
              <span>Editar</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn v-bind="attrs" v-on="on" icon>
                  <v-icon color="error" @click="deleteItem2(item)">
                    mdi-delete
                  </v-icon>
                </v-btn>
              </template>
              <span>Eliminar</span>
            </v-tooltip>
          </template>
          <template v-slot:no-data>
            <v-btn color="primary" @click="initialize"> Reinicar</v-btn>
          </template>
        </v-data-table>
        <v-snackbar
          top
          v-model="snackbar2"
          :color="snackColor2"
          :timeout="timeout"
        >
          <v-icon
            v-bind:class="[
              icon ? 'mdi-check-circle' : 'mdi-bell-cancel',
              'mdi',
            ]"
          ></v-icon>
          {{ text2 }}
          <template v-slot:action="{ attrs }">
            <v-btn
              color="white"
              text
              v-bind="attrs"
              icon
              dark
              @click="snackbar2 = false"
            >
              <v-icon>mdi-close-circle</v-icon>
            </v-btn>
          </template>
        </v-snackbar>
      </v-col>
    </v-row>
  </div>
</template>

<style lang="css" scoped>
.row-table{
  color: white;
  background-color: red;
  margin-right: 20px;
}
</style>
<script>
import axios from "axios";
import { mapState } from "vuex";

export default {
  name: "Departamento",
  data: () => ({
    search: "",
    dialog: false,
    selectedRows: [],
    dialogDelete: false,
    text: "",
    snackbar: false,
    snackColor: "",
    timeout: 2000,
    success: "",
    error: "",
    icon: true,
    active: true,
    // area
    search2: "",
    dialog2: false,
    dialogDelete2: false,
    text2: "",
    snackbar2: false,
    snackColor2: "",
    success: "",
    error: "",
    icon2: true,

    rules: {
      required: (v) => !!v || "Este campo es requerido",
    },
    valid: true,
    valid2: true,
    headers: [
      {
        text: "ID",
        align: "start",
        sortable: false,
        value: "id",
      },
      { text: "Nombre", value: "nombre" },
      { text: "Acciones", value: "actions", sortable: false },
    ],
    headers2: [
      {
        text: "ID",
        align: "start",
        sortable: false,
        value: "id",
      },
      { text: "Nombre", value: "nombre" },
      { text: "Acciones", value: "actions", sortable: false },
    ],
    departamento: [],
    area: [],
    editedIndex: -1,
    editedIndex2: -1,
    editedItem: {
      id: "",
      nombre: "",
    },
    defaultItem: {
      id: "",
      nombre: "",
    },
    // area
    editedItem2: {
      id: "",
      nombre: "",
    },
    defaultItem: {
      id: "",
      nombre: "",
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1
        ? "Nuevo Departamento"
        : "Editar Departamento";
    },
    // arear
    formTitle2() {
      return this.editedIndex2 === -1 ? "Nueva Área" : "Editar Área";
    },
    ...mapState(["loading"]),
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
    // area
    dialog2(val) {
      val || this.close2();
    },
    dialogDelete2(val) {
      val || this.closeDelete2();
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    // myClass (item) {
    //   console.log(item);
    //   const rowClass = 'myclass';
    //   return rowClass
    // },
     rowClicked(row) {
      this.toggleSelection(row.id);
      // console.log(row);
    },
     toggleSelection(keyID) {
      if (this.selectedRows.includes(keyID)) {
        this.selectedRows = this.selectedRows.filter(
          selectedKeyID => selectedKeyID !== keyID
        );
      } else {
        this.selectedRows.push(keyID);
      }
    },
    async initialize() {
      await axios
        .get("http://localhost:8000/api/v1.0/administracion/departamento/")
        .then((res) => {
          this.departamento = res.data;
        })
        .catch((err) => console.log(err));

      await axios
        .get("http://localhost:8000/api/v1.0/administracion/area/")
        .then((res) => {
          this.area = res.data;
          //   console.log(res.data);
        })
        .catch((err) => console.log(err));
    },

    // departamento
    editItem(item) {
      this.editedIndex = this.departamento.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.departamento.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    async deleteItemConfirm() {
      await axios
        .delete(
          `http://localhost:8000/api/v1.0/aplicaciones/modulo/${this.editedItem.id}/`
        )
        .then((res) => {
          this.modulo.splice(this.editedIndex, 1);
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
            `http://localhost:8000/api/v1.0/aplicaciones/modulo/${this.editedItem.id}/`,
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
            `http://localhost:8000/api/v1.0/aplicaciones/modulo/`,
            this.editedItem
          )
          .then((res) => {
            this.modulo.push(res.data);
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
    // area
    editItem2(item) {
      this.editedIndex2 = this.area.indexOf(item);
      this.editedItem2 = Object.assign({}, item);
      this.dialog2 = true;
    },

    deleteItem2(item) {
      this.editedIndex2 = this.area.indexOf(item);
      this.editedItem2 = Object.assign({}, item);
      this.dialogDelete2 = true;
    },
    async deleteItemConfirm2() {
      await axios
        .delete(
          `http://localhost:8000/api/v1.0/aplicaciones/modulo/${this.editedItem.id}/`
        )
        .then((res) => {
          this.area.splice(this.editedIndex, 1);
          (this.snackbar2 = true),
            (this.text2 = "Área eliminada"),
            (this.snackColor2 = "success");
          this.icon2 = true;
        })
        .catch((err) => {
          (this.snackbar2 = true),
            (this.text2 = "No se ha podido eliminar"),
            (this.snackColor2 = "error");
          this.icon2 = false;
        });
      this.closeDelete2();
    },

    close2() {
      this.dialog2 = false;
      this.$nextTick(() => {
        this.editedItem2 = Object.assign({}, this.defaultItem2);
        this.editedIndex2 = -1;
      });
    },

    closeDelete2() {
      this.dialogDelete2 = false;
      this.$nextTick(() => {
        this.editedItem2 = Object.assign({}, this.defaultItem2);
        this.editedIndex2 = -1;
      });
    },
    async save2() {
      if (this.editedIndex2 > -1) {
        await axios
          .put(
            `http://localhost:8000/api/v1.0/aplicaciones/modulo/${this.editedItem2.id}/`,
            this.editedItem2
          )
          .then((res) => {
            this.initialize();
            (this.snackbar2 = true),
              (this.text2 = "Área editada"),
              (this.snackColorw = "success");
            this.icon = true;
          })
          .catch((err) => {
            (this.snackbar2 = true),
              (this.text2 = "No se ha podido editar el área"),
              (this.snackColor2 = "error");
            this.icon2 = false;
          });
      } else {
        await axios
          .post(
            `http://localhost:8000/api/v1.0/aplicaciones/modulo/`,
            this.editedItem2
          )
          .then((res) => {
            this.area.push(res.data);
            (this.snackbar2 = true),
              (this.text2 = "Área añadida"),
              (this.snackColor2 = "success");
            this.icon2 = true;
          })
          .catch((err) => {
            (this.snackbar2 = true),
              (this.text2 = "No se ha podido crear el área"),
              (this.snackColor2 = "error");
            this.icon2 = false;
          });
      }
      this.close();
    },
  },
};
</script>
