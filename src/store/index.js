import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";
import createPersistedState from "vuex-persistedstate";
import router from "../router";


Vue.use(Vuex)

export default new Vuex.Store({
    plugins: [createPersistedState()],
    state: {
        refresh_token: '',
        access_token: '',
        loggedInUser: {},
        loading: false,
        isAuthenticated: false
    },
    mutations: {
        setRefreshToken: function (state, refreshToken) {
            state.refresh_token = refreshToken;

        },
        setAccessToken: function (state, accessToken) {
            state.access_token = accessToken;

        },
        // sets state with user information and toggles
        // isAuthenticated from false to true
        setLoggedInUser: function (state, user) {
            state.loggedInUser = user;
            state.isAuthenticated = true;
        },
        // delete all auth and user information from the state
        clearUserData: function (state) {
            state.refresh_token = "";
            state.access_token = "";
            state.loggedInUser = {};
            state.isAuthenticated = false;

        },
        setloading: function (state, loading) {
            state.loading = loading
        }
    },
    actions: {

        logIn: async ({commit, dispatch}, payload) => {
            const loginUrl = "/api/token/";
            try {

                await axios.post(loginUrl, payload).then(response => {

                    if (response.status === 200) {
                        commit("setRefreshToken", response.data.refresh);
                        commit("setAccessToken", response.data.access);
                        dispatch("fetchUser");
                        // redirect to the home page

                    }
                });
            } catch (e) {
                console.log(e);
            }
        },
        refreshToken: async ({state, commit}) => {
            const refreshUrl = "api/token-refresh/";
            try {
                await axios
                    .post(refreshUrl, {refresh: state.refresh_token})
                    .then(response => {
                        if (response.status === 200) {
                            commit("setAccessToken", response.data.access);
                        }
                    });
            } catch (e) {
                console.log(e.response);
            }
        },
        fetchUser: async ({commit}) => {
            const currentUserUrl = "api/v1.0/administracion/entidad/user_entidad/";
            try {
                await axios.get(currentUserUrl).then(response => {
                    if (response.status === 200) {
                        // commit("setLoggedInUser", response.data);
                        console.log(response.data)
                        router.push({name: "Admin"});
                    }

                });
            } catch (e) {
                console.log(e.response);
            }
        },
        logoUt: ({commit}) => {
            commit("clearUserData")
            router.push("/login");
        }
    },
    getters: {
        loggedInUser: state => state.loggedInUser,
        isAuthenticated: state => state.isAuthenticated,
        accessToken: state => state.access_token,
        refreshToken: state => state.refresh_token,

    }

})

