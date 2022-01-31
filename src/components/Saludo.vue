<template>
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
        <img class="d-none d-sm-flex" :src="myImage" alt="Faro" width="200" />
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: "Saludo",
  data: () => ({
    myImage: require("../assets/img/welcome.svg"),
  }),
};
</script>
