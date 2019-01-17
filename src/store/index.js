import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store =  new Vuex.Store({
    state: {
        userInfo: {
            phoneNumber: "",
            username: "",
            password: "",
            SMSCode: ""
        },
        token: ""
    },
    mutations: {
        SET_TOKEN(state, token) {
            state.token = token
            localStorage.token = token
        },
        DEL_TOKEN(state) {
            state.token = ""
            localStorage.removeItem("token")
        }
    }
})

export default store;
