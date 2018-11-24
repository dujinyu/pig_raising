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
        }
    },
    mutations: {

    }
})

export default store;
