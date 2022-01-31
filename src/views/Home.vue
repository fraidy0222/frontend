<template>
  <v-row>
    <v-col cols="12" sm="8">
      <Saludo />
      <Secciones />
      <Estadisticas />
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
import Saludo from "../components/Saludo.vue";
import Secciones from "../components/Secciones.vue";
import Estadisticas from "../components/Estadisticas.vue";
import axios from "axios";
export default {
  name: "Home",
  components: {
    Saludo,
    Secciones,
    Estadisticas,
  },
  data: () => ({
    data: [],
    myImage: require("../assets/img/welcome.svg"),
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
