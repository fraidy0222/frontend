<template>
  <div>
    <v-toolbar flat class="mt-n1">
      <v-toolbar-title>Secciones de adiminstración del sistema</v-toolbar-title>
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
  </div>
</template>

<script>
export default {
  name: "Secciones",
};
</script>
