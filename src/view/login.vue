<template>
    <div>
        <box gap="10px 10px 0px 10px">
            <button-tab v-model="index">
                <button-tab-item selected @on-item-click="selectedLoginWithUsername">手机号密码登录</button-tab-item>
                <button-tab-item @on-item-click="selectedLoginWithPhoneNumber">手机号验证码登录</button-tab-item>
            </button-tab>
        </box>
        <login-with-username v-if="flag" @phoneNumberAndPassword="getPhoneNumberAndPassword" @validPhoneNumber="validPhoneNumberFlag"></login-with-username>
        <login-with-phone-number v-if="!flag" @phoneNumberAndSMSCode="getPhoneNumberAndSMSCode"></login-with-phone-number>
        <!-- 使用router-view总感觉有一定的问题，至少URL不是我想要的 -->
        <!-- <router-view></router-view> -->
        <!-- <group>
            <cell class="remind">
                <span class="register" @click="goToRegister">注册账号</span>
                <span class="forget-password" @click="goToForgetPassword">忘记密码？</span>
            </cell>
        </group> -->
        <div class="remind">
            <span class="register" @click="goToRegister">注册账号</span>
            <span class="forget-password" @click="goToForgetPassword">忘记密码？</span>
        </div>

        <box gap="0px 10px 0px 10px">
            <group>
                <x-button type="primary" @click.native="login">登录</x-button>
            </group>
        </box>
    </div>
</template>

<script>
import { Box, XInput, Group, XButton, Cell, ButtonTab, ButtonTabItem, Flexbox, FlexboxItem, AlertModule } from 'vux'
import LoginWithPhoneNumber from '../view/loginSubpage/loginWithPhoneNumber.vue'
import LoginWithUsername from "@/view/loginSubpage/loginWithUsername"
export default {
    name: "Login",
    components: {
       Box, XInput, Group, XButton, Cell, ButtonTab, ButtonTabItem, Flexbox, FlexboxItem, AlertModule,
       LoginWithPhoneNumber,
       LoginWithUsername
    },
    data() {
        return {
            index: 0,
            LoginWithUsernameStyle: "",
            LoginWithPhoneNumberStyle: "display: none;",
            flag: true,
            userInfo: {
                phoneNumber: "",
                // username: "",
                password: "",
                SMSCode: ""
            },
            validPhoneNumberFlag1: true
        }
    },
    watch: {
        flag: function(newV, oldV) {
            this.userInfo = {
                phoneNumber: "",
                // username: "",
                password: "",
                SMSCode: ""
            }
        }
    },
    methods: {
        login() {
            if (this.validPhoneNumberFlag1 == false) {
                AlertModule.show({
                    title: "提示",
                    content: "手机号输入不正确！"
                })
            } else {
                console.log("请求登录！")
                // 这一段是需要的
                // this.$axios.post("/purchase/login", {
                //     userId: this.userInfo.phoneNumber,
                //     passwd: this.userInfo.password,
                //     VerificationCode: this.userInfo.SMSCode
                // })
                // .then(res => {
                //     if (res.data.status === "success") {
                //         console.log("登录成功!")
                //         this.$router.push({path: "/home"})
                //     }
                // })
                // .catch(err => {
                //     console.log(err)
                // })
            }
            console.log("登录！")
            console.log(this.userInfo);
        },
        validPhoneNumberFlag(data) {
            this.validPhoneNumberFlag1 = data;
        },
        getPhoneNumberAndPassword(data) {
            //console.log("getPhoneNumberAndPassword")
            //console.log(data)
            this.userInfo.phoneNumber = data.phoneNumber.split(" ").join("");
            this.userInfo.password = data.password;
        },
        getPhoneNumberAndSMSCode(data) {
            this.userInfo.phoneNumber = data.phoneNumber.split(" ").join("");
            this.userInfo.SMSCode = data.SMSCode;
        },
        selectedLoginWithUsername() {
            this.flag = true;
            //this.$router.push({path: "/login/username"})
            //this.LoginWithUsernameStyle = "";
            //this.LoginWithPhoneNumberStyle = "display: none;"
        },
        selectedLoginWithPhoneNumber() {
            //this.$router.push({path: "/login/phonenumber"})
            //this.LoginWithUsernameStyle = "display: none;";
            //this.LoginWithPhoneNumberStyle = ""
            this.flag = false;
        },
        goToRegister() {
            this.$router.push({path: "/register"})
        },
        goToForgetPassword() {
            this.$router.push({path: "/forgetpassword"})
            // return;
        }

    },
    mounted() {
        // this.$router.push({path: "/login/username"})
    }
}
</script>

<style>
    .remind {
        display: flex;
        justify-content: space-around;
        margin-top: 15px;
    }
    .register, .forget-password {
        color: blue;
    }
</style>

