<template>
    <div>
        <group>
            <x-input
                title="手机号"
                ref="mobile"
                name="mobile"
                placeholder="请输入手机号"
                v-model="userInfo.phoneNumber"
                keyboard="number"
                mask="999 9999 9999"
                :max="13"
                is-type="china-mobile"
                required>
            </x-input>
        </group>
        <group>
            <x-input title="验证码" class="weui-vcode" v-model="userInfo.SMSCode" placeholder="请输入验证码" :max="6">
                <x-button slot="right" :disabled="buttonDisabled" :type="buttonType" mini @click.native="requestSMSCode" :text="buttonText"></x-button>
            </x-input>
        </group>
    </div>
</template>

<script>
import { XInput, Group, XButton, Cell, ButtonTab, ButtonTabItem } from 'vux'
import { generalAlert } from "@/common/function/func"
export default {
    name: "PhoneNumber",
    components: {
        XInput, Group, XButton, Cell, ButtonTab, ButtonTabItem
    },
    props: {},
    data() {
        return {
            userInfo: {
                phoneNumber: "",
                SMSCode: ""
            },
            buttonText: "发送验证码",
            countDownTime: 60,
            buttonType: "default",
            buttonDisabled: true,
            getSMSCodeURL: "/purchase/getSMSCode/"
        }
    },
    watch:{
        "userInfo.phoneNumber": function(newV, oldV) {
            //console.log(newV);
            if (this.$refs.mobile.valid) {
                this.buttonDisabled = false;
                this.buttonType = "primary";
            } else {
                this.buttonDisabled = true;
                this.buttonType = "default";
            }
            this.$emit("phoneNumberAndSMSCode", this.userInfo);
            this.$emit("validPhoneNumber", this.$refs.mobile.valid);
        },
        "userInfo.SMSCode": function(newV, oldV) {
            this.$emit("phoneNumberAndSMSCode", this.userInfo);
        }
    },
    computed: {},
    methods: {
        requestSMSCode() {
            console.log("requestSMSCode")
            if (this.$refs.mobile.valid) {
                // 用于登录界面表示假定手机号已经被注册过了
                console.log(this.userInfo.phoneNumber.split(" ").join(""))
                let phoneNumber = this.userInfo.phoneNumber.split(" ").join("")
                this.$get(this.getSMSCodeURL + phoneNumber + "N")
                .then((res) => {
                    console.log(res.data);
                    //this.userInfo.SMSCode = res.data.SMSCode;
                    if (res.data.status === "telnotexist") {
                        generalAlert("手机号尚未被注册，请输入正确的手机号，或者前往注册！")
                    } else if (res.data.status === "success") {
                        console.log(res)
                        generalAlert("手机验证码发送成功！")
                    }
                })
                .catch((err) => {
                    console.log(err);
                    generalAlert("验证码请求失败，请输入正确的手机号！")
                })
            } else {
                generalAlert("手机号格式不正确，请重新输入！")
            }

            //计时禁用发送验证码功能
            this.buttonDisabled = true;
            this.buttonType = "default";
            this.countDown();
            // return;
        },
        countDown() {
            if ( this.countDownTime < 0 ) {
                this.buttonText = "发送验证码";
                if (this.$refs.mobile.valid) {
                    this.buttonDisabled = false;
                    this.buttonType = "primary";
                }
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
