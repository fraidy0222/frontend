<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
    >
      <!-- Administracion -->
      <v-list dense>
        <v-list-group :value="false" prepend-icon="mdi-home-edit-outline">
          <template v-slot:activator>
            <v-list-item-title>Administración</v-list-item-title>
          </template>

          <v-list-item
            v-for="(item, i) in administracion"
            :key="i"
            :to="item.action"
          >
            <v-list-item-content class="ml-14">
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
      <!-- Ofimática -->
      <v-list dense>
        <v-list-group :value="false" prepend-icon="mdi-desktop-tower-monitor">
          <template v-slot:activator>
            <v-list-item-title>Ofimática</v-list-item-title>
          </template>

          <v-list-item
            v-for="(item, i) in ofimatica"
            :key="i"
            :to="item.action"
          >
            <v-list-item-content class="ml-14">
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
      <!-- Comunicaciones -->
      <v-list dense>
        <v-list-group :value="false" prepend-icon="mdi-radio-tower">
          <template v-slot:activator>
            <v-list-item-title>Comunicación</v-list-item-title>
          </template>
          <!-- redes -->
          <v-list-group no-action sub-group>
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>Redes</v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item v-for="(item, i) in redes" :key="i" link>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item>
          </v-list-group>
          <!-- telefonia -->
          <v-list-group no-action sub-group>
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>Telefonía</v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item v-for="(item, i) in telefonia" :key="i" link>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item>
          </v-list-group>
          <!-- radio -->
          <!-- telefonia -->
          <v-list-group no-action sub-group>
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>Radio</v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item v-for="(item, i) in radio" :key="i" link>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item>
          </v-list-group>
        </v-list-group>
      </v-list>
      <!-- Aplicaciones -->
      <v-list dense>
        <v-list-group :value="false" prepend-icon="mdi-apps">
          <template v-slot:activator>
            <v-list-item-title>Aplicaciones</v-list-item-title>
          </template>

          <v-list-item
            v-for="(item, i) in aplicaciones"
            :key="i"
            :to="item.action"
          >
            <v-list-item-content class="ml-14">
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
      <!-- Automática -->
      <v-list dense>
        <v-list-group :value="false" prepend-icon="mdi-head-cog-outline">
          <template v-slot:activator>
            <v-list-item-title>Automática</v-list-item-title>
          </template>

          <v-list-item
            v-for="(item, i) in automatica"
            :key="i"
            :to="item.action"
          >
            <v-list-item-content class="ml-14">
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>

      <!-- Recurso humanos -->
      <v-list dense>
        <v-list-group :value="false" prepend-icon="mdi-account-cog-outline">
          <template v-slot:activator>
            <v-list-item-title>Recursos.H</v-list-item-title>
          </template>

          <v-list-item v-for="(item, i) in humanos" :key="i" :to="item.action">
            <v-list-item-content class="ml-14">
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
      <!-- Seguridad Informatica -->
      <v-list dense>
        <v-list-group :value="false" prepend-icon="mdi-shield-alert-outline">
          <template v-slot:activator>
            <v-list-item-title>Seguridad</v-list-item-title>
          </template>

          <v-list-item
            v-for="(item, i) in seguridad"
            :key="i"
            :to="item.action"
          >
            <v-list-item-content class="ml-14">
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
      <!-- Telematica -->
      <v-list dense>
        <v-list-group :value="false" prepend-icon="mdi-server">
          <template v-slot:activator>
            <v-list-item-title>Telemática</v-list-item-title>
          </template>

          <v-list-item
            v-for="(item, i) in telematica"
            :key="i"
            :to="item.action"
          >
            <v-list-item-content class="ml-14">
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>
        <router-link :to="{ path: 'inicio' }" class="nombre"
          >InfoGelma</router-link
        >
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-badge bordered color="primary" dot>
            <v-icon v-bind="attrs" v-on="on">mdi-bell-outline</v-icon>
          </v-badge>
        </template>
        <v-list subheader two-line>
          <v-subheader inset>Mensajes</v-subheader>
          <v-list-item v-for="file in files" :key="file.title">
            <v-list-item-avatar>
              <v-icon :class="file.color" dark v-text="file.icon"></v-icon>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title v-text="file.title"></v-list-item-title>

              <v-list-item-subtitle
                v-text="file.subtitle"
              ></v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
              <span color="grey lighten-2" v-text="file.number"></span>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn class="ml-4" v-bind="attrs" v-on="on" tile text>
            Admin
            <v-avatar class="ml-2" size="35">
              <v-img :src="myImage"></v-img>
            </v-avatar>
          </v-btn>
        </template>
        <v-list>
          <v-list-item>
            <v-btn text>
              <v-icon class="mr-3">mdi-account-box-outline</v-icon>
              Usuario</v-btn
            >
          </v-list-item>
          <v-list-item>
            <v-btn @click="logoUt" text>
              <v-icon class="mr-3">mdi-logout</v-icon>
              Logout</v-btn
            >
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
  </div>
</template>

<style scoped>
.nombre {
  color: rgba(0, 0, 0, 0.87);
  text-decoration: none;
}
.v-list-item--dense .v-list-item__title,
.v-list-item--dense .v-list-item__subtitle,
.v-list--dense .v-list-item .v-list-item__title,
.v-list--dense .v-list-item .v-list-item__subtitle {
  font-weight: 600;
}
.v-application--is-ltr
  .v-list-group--no-action.v-list-group--sub-group
  > .v-list-group__items
  > .v-list-item {
  margin-left: -20px;
}
</style>
<script>
export default {
  data: () => ({
    drawer: null,
    myImage: require("../../assets/img/avatar.jpg"),
    aplicaciones: [
      {
        text: "Aplicación OK",
        icon: "mdi-clock",
        action: { path: "aplicacion" },
      },
      { text: "Módulo OK", icon: "mdi-account", action: { path: "modulo" } },
      {
        text: "Informáticas",
        icon: "mdi-flag",
        action: { path: "informaticas" },
      },
    ],
    automatica: [
      { text: "Órgano", icon: "mdi-clock", action: { path: "organo" } },
      { text: "Proyecto", icon: "mdi-account" },
      { text: "Informáticas", icon: "mdi-flag" },
    ],
    // comunicaciones: [
    //   { text: "Licencia Red", icon: "mdi-clock", action: "/login" },
    //   { text: "Fuente Planta Tronki", icon: "mdi-account" },
    //   { text: "Planta Fija", icon: "mdi-flag" },
    //   { text: "Tronki Fijo", icon: "mdi-clock", action: "/login" },
    //   { text: "Tipo Equipo", icon: "mdi-account" },
    //   { text: "Línea Telefónica", icon: "mdi-flag" },
    //   { text: "Telefonía Movil", icon: "mdi-clock", action: "/login" },
    //   { text: "Equipo Conectividad", icon: "mdi-account" },
    //   { text: "Telefonía Fija", icon: "mdi-flag" },
    //   { text: "Telefonía Alternativa", icon: "mdi-clock", action: "/login" },
    //   { text: "Tronki", icon: "mdi-account" },
    //   { text: "WalkieTalkie", icon: "mdi-flag" },
    //   { text: "Pizzara", icon: "mdi-account" },
    //   { text: "Repetidor", icon: "mdi-flag" },
    // ],
    administracion: [
      { text: "Entidad", icon: "mdi-account", action: "/admin/entidad" },
      {
        text: "Departamento",
        icon: "mdi-flag",
        action: { path: "departamento" },
      },
      { text: "Usuario" },
    ],
    files: [
      {
        color: "error",
        icon: "mdi-bell-alert",
        subtitle: "Enero 20, 2021",
        title: "Error",
        number: 2,
      },
      {
        color: "amber",
        icon: "mdi-alert-outline",
        subtitle: "Abril 10, 2020",
        title: "Advertencia",
        number: 5,
      },
    ],
    ofimatica: [
      { text: "Expediente PC" },
      { text: "Comunicaciones" },
      { text: "Ram" },
    ],
    redes: [{ text: "Equipamiento" }, { text: "Licencia de red" }],
    telefonia: [
      { text: "Telefonía fija" },
      { text: "Telefonía móvil" },
      { text: "Telefonía fija alternativa" },
      { text: "Pizzara" },
    ],
    radio: [
      { text: "Planta" },
      { text: "Tronki" },
      { text: "WalkieTalkie" },
      { text: "Repetidor" },
    ],
    humanos: [{ text: "Trabajador" }, { text: "Certificación" }],
    seguridad: [
      { text: "Informáticas" },
      { text: "Escaneo de Red" },
      { text: "Antivirus" },
    ],
    telematica: [{ text: "Telemática" }, { text: "Red" }],
  }),
  methods: {
    logoUt() {
      this.$store.dispatch("logoUt");
    },
  },
};
</script>
