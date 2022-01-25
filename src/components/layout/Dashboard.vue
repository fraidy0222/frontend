<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
    >
      <!-- Aplicaciones -->
      <v-list dense>
        <v-list-group :value="true" prepend-icon="mdi-apps">
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
      <!-- End Aplicaciones -->
      <!-- Ofimática -->
      <!-- <v-list>
        <v-list-group :value="true" prepend-icon="mdi-account-circle">
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
      </v-list> -->
      <!-- End Ofimática -->
      <!-- Automática -->
      <v-list dense>
        <v-list-group :value="true" prepend-icon="mdi-head-cog-outline">
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
      <!-- End Automática -->
      <!-- Comunicaciones -->
      <v-list dense>
        <v-list-group :value="false" prepend-icon="mdi-radio-tower">
          <template v-slot:activator>
            <v-list-item-title>Comunicación</v-list-item-title>
          </template>

          <v-list-item
            v-for="(item, i) in comunicaciones"
            :key="i"
            :to="item.action"
          >
            <v-list-item-content class="ml-14">
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
      <!-- End Comunicaciones -->
      <!-- Administración -->
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
      <!-- End Administración -->
      <!-- <template v-slot:append>
        <div class="pa-2">
          <v-btn block text>
            <v-icon>mdi-logout</v-icon>
            Cerrar Sesión
          </v-btn>
        </div>
      </template> -->
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
          <v-list-item v-for="(item, index) in profile" :key="index">
            <v-list-item-avatar>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-avatar>
            <v-list-item-title v-text="item.title"></v-list-item-title>
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
</style>
<script>
export default {
  data: () => ({
    drawer: null,
    myImage: require("../../assets/img/avatar.jpg"),
    security: [
      {
        text: "Roles",
        icon: "mdi-shield-account-outline",
        action: "/admin/roles",
      },
      {
        text: "Usuarios",
        icon: "mdi-account-outline",
        action: "/admin/usuarios",
      },
    ],
    aplicaciones: [
      {
        text: "Aplicación",
        icon: "mdi-clock",
        action: "/admin/aplicacion",
      },
      { text: "Módulo", icon: "mdi-account" },
      { text: "Informáticas", icon: "mdi-flag" },
    ],
    automatica: [
      { text: "Órgano", icon: "mdi-clock", action: "/login" },
      { text: "Proyecto", icon: "mdi-account" },
      { text: "Informáticas", icon: "mdi-flag" },
    ],
    comunicaciones: [
      { text: "Licencia Red", icon: "mdi-clock", action: "/login" },
      { text: "Fuente Planta Tronki", icon: "mdi-account" },
      { text: "Planta Fija", icon: "mdi-flag" },
      { text: "Tronki Fijo", icon: "mdi-clock", action: "/login" },
      { text: "Tipo Equipo", icon: "mdi-account" },
      { text: "Línea Telefónica", icon: "mdi-flag" },
      { text: "Telefonía Movil", icon: "mdi-clock", action: "/login" },
      { text: "Equipo Conectividad", icon: "mdi-account" },
      { text: "Telefonía Fija", icon: "mdi-flag" },
      { text: "Telefonía Alternativa", icon: "mdi-clock", action: "/login" },
      { text: "Tronki", icon: "mdi-account" },
      { text: "WalkieTalkie", icon: "mdi-flag" },
      { text: "Pizzara", icon: "mdi-account" },
      { text: "Repetidor", icon: "mdi-flag" },
    ],
    administracion: [
      { text: "Entidad", icon: "mdi-account" },
      { text: "Departamento", icon: "mdi-flag" },
      { text: "Área", icon: "mdi-account" },
      { text: "Perfil", icon: "mdi-flag" },
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
    profile: [
      { title: "Perfil", icon: "mdi-account-box-outline" },
      { title: "Cerrar Sesión", icon: "mdi-logout" },
    ],
  }),
};
</script>
