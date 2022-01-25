<template>
  <v-row>
    <v-col cols="12" sm="8">
      <v-card class="mx-4 rounded-xl pa-4" color="light-blue" dark>
        <v-row>
          <v-col cols="12" sm="8">
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title class="text-h3 font-weight-bold mb-1"
                  >Hola Admin</v-list-item-title
                >
                <v-list-item-subtitle class="text-h6"
                  >Lorem ipsum dolor, sit amet consectetur<br />
                  elit Doloribus unde voluptatum quae quod.
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-col>
          <v-col cols="12" sm="4">
            <img
              class="d-none d-sm-flex"
              :src="myImage"
              alt="Faro"
              width="200"
            />
          </v-col>
        </v-row>
      </v-card>
      <v-toolbar flat class="mt-n1">
        <v-toolbar-title
          >Secciones de adiminstración del sistema</v-toolbar-title
        >
        <v-spacer></v-spacer>
        <v-btn text class="grey--text">Ver Todos</v-btn>
      </v-toolbar>
      <v-row class="mt-n5 ml-1 mr-1">
        <v-col cols="12" sm="4">
          <v-card class="rounded-xl" color="grey lighten-3">
            <v-card-title>Aplicaciones</v-card-title>
            <v-card-text>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorum
              odio, deserunt nulla, nostrum debitis excepturi consectetur iste
              facilis.
            </v-card-text>
            <v-card-actions>
              <v-btn class="mx-auto" color="black" dark>
                Ver
                <v-icon>mdi-arrow-right</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="12" sm="4">
          <v-card class="rounded-xl" color="light-blue" dark>
            <v-card-title>Ofimática</v-card-title>
            <v-card-text>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorum
              odio, deserunt nulla, nostrum debitis excepturi consectetur iste
              facilis.
            </v-card-text>
            <v-card-actions>
              <v-btn class="mx-auto" color="black" dark>
                Ver
                <v-icon>mdi-arrow-right</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="12" sm="4">
          <v-card class="rounded-xl" color="grey lighten-3">
            <v-card-title>Automática</v-card-title>
            <v-card-text>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorum
              odio, deserunt nulla, nostrum debitis excepturi consectetur iste
              facilis.
            </v-card-text>
            <v-card-actions>
              <v-btn class="mx-auto" color="black" dark>
                Ver
                <v-icon>mdi-arrow-right</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <v-col cols="12" sm="12">
        <v-card color="blue-grey lighten-4 rounded-xl px-5">
          <v-toolbar flat class="mt-n1" color="blue-grey lighten-4">
            <v-toolbar-title>Estadísticas</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-sparkline
            :value="value"
            color="blue-grey darken-3"
            :smooth="radius || false"
            :padding="padding"
            :line-width="width"
            :stroke-linecap="lineCap"
            :gradient-direction="gradientDirection"
            :fill="fill"
            :type="type"
            :auto-line-width="autoLineWidth"
            auto-draw
          >
            <template v-slot:label="item"> ${{ item.value }} </template>
          </v-sparkline>
        </v-card>
      </v-col>
    </v-col>
    <v-col cols="12" sm="4">
      <v-card class="rounded-xl pa-4" color="grey lighten-3">
        <v-app-bar tile color="grey lighten-4">
          <v-btn color="light-blue" tile dark fab small elevation="0"
            ><v-icon>mdi-account-group</v-icon></v-btn
          >
          <strong class="subtitle black--text ml-2"
            >Usuarios
            <span class="caption"
              ><br />
              80</span
            >
          </strong>
          <v-spacer></v-spacer>
          <v-icon>mdi-arrow-right-circle</v-icon>
        </v-app-bar>
        <v-app-bar tile color="grey lighten-4 mt-3">
          <v-btn color="orange" tile dark fab small elevation="0"
            ><v-icon>mdi-home-edit-outline</v-icon></v-btn
          >
          <strong class="subtitle black--text ml-2"
            >Adiminstración
            <span class="caption"
              ><br />
              180</span
            >
          </strong>
          <v-spacer></v-spacer>
          <v-icon>mdi-arrow-right-circle</v-icon>
        </v-app-bar>
        <v-app-bar tile color="grey lighten-4 mt-3">
          <v-btn color="green" tile dark fab small elevation="0"
            ><v-icon>mdi-wifi-arrow-up-down</v-icon></v-btn
          >
          <strong class="subtitle black--text ml-2"
            >Comunicaciones
            <span class="caption"
              ><br />
              100</span
            >
          </strong>
          <v-spacer></v-spacer>
          <v-icon>mdi-arrow-right-circle</v-icon>
        </v-app-bar>
      </v-card>
    </v-col>
  </v-row>
</template>
<style scoped>
/* .v-application .text-h6 {
  font-family: Georgia, "Lucida Sans", sans-serif;
} */
</style>

<script>
import axios from "axios";
export default {
  name: "Home",
  data: () => ({
    data: [],
    myImage: require("../assets/img/welcome.svg"),
    width: 2,
    radius: 10,
    padding: 12,
    lineCap: "round",
    value: [423, 446, 675, 510, 590, 610, 760],
    gradientDirection: "top",
    fill: false,
    type: "trend",
    autoLineWidth: false,
  }),

  created() {
    this.loadData();
  },

  methods: {
    loadData() {
      axios
        .get("http://localhost:8000/api/v1.0/administracion/entidad/")
        .then((res) => {
          this.data = res.data;
        });
    },
  },
};
</script>
