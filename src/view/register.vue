<template>
    <div>
        <x-header>账号注册</x-header>
        <group>
            <x-input
                title="手机号"
                name="mobile"
                placeholder="请输入手机号"
                v-model="userInfo.phoneNumber"
                keyboard="number"
                is-type="china-mobile">
            </x-input>
        </group>
        <group>
            <x-input title="用户名" placeholder="请输入用户名" v-model="userInfo.username"></x-input>
        </group>
        <group>
            <x-input title="密码" name="password" placeholder="请输入密码" :type="passwordType" v-model="userInfo.password">
                <!-- <img slot="right" :src="iconSrc" style="width: 16px; height:16px;" alt=""> -->
                <span slot="right" @click="showAndHidPassword">{{ checkPassword }}</span>
            </x-input>
        </group>
        <group>
            <x-input title="验证码" class="weui-vcode" v-model="userInfo.SMSCode" placeholder="请输入验证码">
                <x-button slot="right" :disabled="buttonDisabled" :type="buttonType" mini @click.native="requestSMSCode" :text="buttonText"></x-button>
            </x-input>
        </group>
        <box gap="10px 10px">
            <group>
                <x-button type="primary">注册</x-button>
            </group>
        </box>
    </div>
</template>

<script>
import { XHeader, Group, XInput, XButton, Box } from 'vux'
export default {
    name: "Register",
    components: {
        XHeader, Group, XInput, XButton, Box
    },
    props: {},
    data() {
        return {
            userInfo: {
                phoneNumber: "",
                username: "",
                password: "",
                SMSCode: "",
            },
            buttonDisabled: false,
            buttonType: "primary",
            buttonText: "发送验证码",
            countDownTime: 60,
            flag: true,
            passwordType: "password",
            checkPassword: "查看密码"

        }
    },
    watch:{},
    computed: {},
    methods: {
        requestSMSCode() {
            console.log("requestSMSCode")
            //计时禁用发送验证码功能
            this.buttonDisabled = true;
            this.buttonType = "default";
            this.countDown();
            // return;
        },
        countDown() {
            if ( this.countDownTime < 0 ) {
                this.buttonDisabled = false;
                this.buttonType = "primary";
                this.buttonText = "发送验证码";
                this.countDownTime = 60;
            } else {
                this.buttonText = this.countDownTime.toString() + "秒后重新发送";
                //console.log(this.SMSCode);
                setTimeout(() => {
                    this.countDown()
                }, 1000);
                this.countDownTime--;
            }
            // return;
        },
        showAndHidPassword() {
            if (this.flag) {
                this.passwordType = "text";
                this.checkPassword = "隐藏密码";
                this.flag = false;
            } else {
                this.passwordType = "password";
                this.checkPassword = "查看密码";
                this.flag = true;
            }
        }
    },
    created() {},
    mounted() {}
}
</script>

<style scoped>

</style>
// <style lang="less" scoped>
//     @header-background-color: black;
// </style>


