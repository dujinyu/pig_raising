<template>
    <div>
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
            <x-input title="验证码" class="weui-vcode" v-model="SMSCode">
                <x-button slot="right" :disabled="buttonDisabled" :type="buttonType" mini @click.native="requestSMSCode" :text="buttonText"></x-button>
            </x-input>
        </group>
    </div>
</template>

<script>
import { XInput, Group, XButton, Cell, ButtonTab, ButtonTabItem } from 'vux'
export default {
    name: "PhoneNumber",
    components: {
        XInput, Group, XButton, Cell, ButtonTab, ButtonTabItem
    },
    props: {},
    data() {
        return {
            phoneNumber: "",
            SMSCode: "",
            buttonText: "发送验证码",
            countDownTime: 10,
            buttonType: "primary",
            buttonDisabled: false
        }
    },
    watch:{},
    computed: {},
    methods: {
        requestSMSCode() {
            console.log("requestSMSCode")
            //计时禁用发送验证码功能
            this.buttonDisabled = true;
            this.buttonType = "default";~
            this.countDown();
            // return;
        },
        countDown() {
            if ( this.countDownTime < 0 ) {
                this.buttonDisabled = false;
                this.buttonType = "primary";
                this.buttonText = "发送验证码";
                this.countDownTime = 10;
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
