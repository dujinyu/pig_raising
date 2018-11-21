<template>
    <div>
        <x-header>忘记密码</x-header>
        <group>
            <x-input
                title="手机号码"
                name="mobile"
                placeholder="请输入手机号码"
                v-model="phoneNumber"
                keyboard="number"
                is-type="china-mobile">
            </x-input>
        </group>
        <group>
            <x-input title="验证码" class="weui-vcode" v-model="SMSCode" placeholder="请输入验证码">
                <x-button slot="right" :disabled="buttonDisabled" :type="buttonType" mini @click.native="requestSMSCode" :text="buttonText"></x-button>
            </x-input>
        </group>
        <box gap="10px 10px">
            <group>
                <x-button type="primary">找回密码</x-button>
            </group>
        </box>
    </div>
</template>

<script>
import { XHeader, Group, XInput, XButton, Box } from 'vux'
export default {
    name: "ForgetPassword",
    components: {
        XHeader, Group, XInput, XButton, Box
    },
    props: {},
    data() {
        return {
            phoneNumber: "",
            SMSCode: "",
            buttonDisabled: false,
            buttonType: "primary",
            buttonText: "发送验证码",
            countDownTime: 60,
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
        }
    },
    created() {},
    mounted() {}
}
</script>

<style scoped>

</style>
