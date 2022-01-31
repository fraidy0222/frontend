<template>
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
</template>

<script>
export default {
  name: "Estadisticas",
  data: () => ({
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
};
</script>
