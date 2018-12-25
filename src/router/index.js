import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

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
            component: resolve => require(["@/view/login"], resolve)
        },
        {
            path: "/register",
            name: "Register",
            component: resolve => require(["@/view/register"], resolve)
        },
        {
            path: "/forgetpassword",
            name: "ForgetPassword",
            component: resolve => require(["@/view/personalInfo/forgetPassword"], resolve)
        },
        {
            path: "/home",
            name: "Home",
            component: resolve => require(["@/view/home"], resolve)
        }
    ]
})

export default router;
