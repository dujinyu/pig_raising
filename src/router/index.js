import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

// 页面引入
import Login from "@/view/login"
import Register from "@/view/register"
// import LoginWithUsername from "@/view/loginSubpage/loginWithUsername"
// import LoginWithPhoneNumber from '../view/loginSubpage/loginWithPhoneNumber.vue'
import ForgetPassword from '../view/forgetPassword/forgetPassword'
import Home from '../view/home'

const router = new Router({
    routes: [
        {
            path: "/",
            name: "index",
            redirect: "/login"

        },
        {
            path: "/login",
            name: "Login",
            component: Login,
            // children: [
            //     {
            //         path: "username",
            //         name: "LoginWithUsername",
            //         component: LoginWithUsername,
            //     },
            //     {
            //         path: "phonenumber",
            //         name: "LoginWithPhoneNumber",
            //         component: LoginWithPhoneNumber
            //     }
            // ]
        },
        {
            path: "/register",
            name: "Register",
            component: Register
        },
        {
            path: "/forgetpassword",
            name: "ForgetPassword",
            component: ForgetPassword
        },
        {
            path: "/home",
            name: "Home",
            component: Home
        }
    ]
})

export default router;
