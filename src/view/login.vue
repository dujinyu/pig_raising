<template>
    <div>
        <x-header :left-options="{showBack: false}">登录</x-header>
        <box gap="30px 10px 0px 10px">
            <button-tab v-model="index">
                <button-tab-item selected @on-item-click="selectedLoginWithUsername">手机号密码登录</button-tab-item>
                <button-tab-item @on-item-click="selectedLoginWithPhoneNumber">手机号验证码登录</button-tab-item>
            </button-tab>
        </box>
        <login-with-username v-if="flag" @phoneNumberAndPassword="getPhoneNumberAndPassword" @validPhoneNumber="validPhoneNumberFlag"></login-with-username>
        <login-with-phone-number v-if="!flag" @phoneNumberAndSMSCode="getPhoneNumberAndSMSCode" @validPhoneNumber="validPhoneNumberFlag"></login-with-phone-number>
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
import { Box, XInput, Group, XButton, Cell, ButtonTab, ButtonTabItem, Flexbox, FlexboxItem, XHeader } from 'vux'
import LoginWithPhoneNumber from '../view/loginSubpage/loginWithPhoneNumber.vue'
import LoginWithUsername from "@/view/loginSubpage/loginWithUsername"
import { generalAlert } from "@/common/function/func"
export default {
    name: "Login",
    components: {
       Box, XInput, Group, XButton, Cell, ButtonTab, ButtonTabItem, Flexbox, FlexboxItem, XHeader,
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
                SMSCode: "",
                graVerCode: ""
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
                SMSCode: "",
                graVerCode: ""
            }
        }
    },
    methods: {
        login() {
            // 表示如果在手机号密码登录界面 且 手机号验证错误 则报错
            if (this.validPhoneNumberFlag1 == false || this.userInfo.phoneNumber == "") {
                let contents = "手机号输入不正确！"
                generalAlert(contents + "请重新输入!")
            } else if (this.flag == false && this.userInfo.SMSCode == "") {
                let contents = "短信验证码不能为空!";
                generalAlert(contents + "请重新输入!")
            } else if (this.flag == true && (this.userInfo.password == "" || this.userInfo.graVerCode == "")) {
                let contents = ""
                if (this.userInfo.password == "" && contents == "") {contents = "密码不能为空！"}
                if (this.userInfo.graVerCode == "" && contents == "") {contents = "图形验证码不能为空！"}
                generalAlert(contents + "请重新输入")
            }else {
                console.log("请求登录！")
                // 这一段是需要的
                if (this.flag) {
                    // 手机号密码登录
                    console.log(this.userInfo)
                    this.$axios.post("/purchase/login/0", {
                        tel: this.userInfo.phoneNumber,
                        passwd: this.userInfo.password,
                        VerificationCode: this.userInfo.graVerCode
                    })
                    .then(res => {
                        if (res.data.status === "success") {
                            console.log("手机号密码登录成功")
                            this.$router.push({path: "/home"})
                        } else if (res.data.status === "error") {
                            generalAlert("图形验证码填写错误，请重新填写！")
                        } else if (res.data.status === "loginfailed") {
                            generalAlert("手机号或密码填写错误，请重新填写！")
                        }
                    })
                    .catch(err => {
                        console.log(err)
                        console.log("手机号密码登录请求失败")
                        // 这里需要添加token
                        this.$router.push({path: "/home"})
                    })
                } else {
                    // 手机号验证码登录
                    this.$axios.post("/purchase/login/1", {
                        tel: this.userInfo.phoneNumber,
                        SMSCode: this.userInfo.SMSCode
                    })
                    .then(res => {
                        if (res.data.status === "success") {
                            console.log("手机号验证码登录成功")
                            // 这里需要添加token
                            this.$router.push({path: "/home"})
                        } else if (res.data.status === "error") {
                            generalAlert("手机号或短信验证码填写不正确，请重新填写！")
                        }
                    })
                    .catch(err => {
                        console.log(err)
                        console.log("手机号验证码登录失败")
                    })
                }

            }
            // console.log("登录！")
            // console.log(this.userInfo);
        },
        // 用于在手机号密码登录中验证手机号的格式正确与否， 默认是正确的
        validPhoneNumberFlag(data) {
            this.validPhoneNumberFlag1 = data;
        },
        getPhoneNumberAndPassword(data) {
            //console.log("getPhoneNumberAndPassword")
            //console.log(data)
            this.userInfo.phoneNumber = data.phoneNumber.split(" ").join("");
            this.userInfo.password = data.password;
            this.userInfo.graVerCode = data.graVerCode;
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

<style scoped>
    .remind {
        display: flex;
        justify-content: space-around;
        margin-top: 15px;
    }
    .register, .forget-password {
        color: blue;
    }
</style>

