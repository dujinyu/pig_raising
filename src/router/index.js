import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: "/",
            name: "index",
            redirect: "/home"

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
            component: resolve => require(["@/view/home"], resolve),
            // redirect: "/home/pigfarm",
            children: [
                {
                    path: "pigfarm",
                    name: "PigFarm",
                    component: resolve => require(["@/view/pigFarm/pigFarm"], resolve)
                },
                {
                    path: "contract",
                    name: "Contract",
                    component: resolve => require(["@/view/contract/contract"], resolve)
                },
                {
                    path: "personal-info",
                    name: "PersonalInfo",
                    component: resolve => require(["@/view/personalInfo/me"], resolve)
                }
            ]
        },
        {
            path: "/modify-username",
            name: "ModifyUsername",
            component: resolve => require(["@/view/personalInfo/modifyUsername"], resolve)
        },
        {
            path: "/modify-password",
            name: "ModifyPassword",
            component: resolve => require(["@/view/personalInfo/modifyPassword"], resolve)
        },
        {
            path: "/modify-phonenumber",
            name: "ModifyPhoneNumber",
            component: resolve => require(["@/view/personalInfo/modifyPhoneNumber"], resolve)
        },
        {
            path: "/details",
            name: "ContractDetails",
            component: resolve => require(["@/view/contract/contractDetails"], resolve)
        },
        {
            path: "/add-contract",
            name: "AddContract",
            component: resolve => require(["@/view/contract/addContract"], resolve)
        }
    ]
})

export default router;
