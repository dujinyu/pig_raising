import Vue from 'vue'
import Router from 'vue-router'
import store from "@/store"
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
            // meta: {
            //     requireAuth: true
            // },
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

// router.beforeEach((to, from, next) => {
//     // console.log(store.state)
//     if (to.matched.some(req => req.meta.requireAuth)) {
//         // 这里的requireAuth为路由中定义的 meta:{requireAuth:true}，
//         // 意思为：该路由添加该字段，表示进入该路由需要登陆的
//         if (store.state.token) {
//             // 如果有token值，那么就允许跳转
//             next()
//         } else {
//             // 如果没有token值，就跳转到登录页面
//             console.log("没有token值")
//             next({
//                 name: "Login"
//             })
//         }
//     } else {
//         // 如果不需要Auth，就直接跳转
//         next()
//     }
// })

export default router;
