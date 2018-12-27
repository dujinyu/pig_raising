<template>
    <div>
        <group :title="alertText">
            <GetSMSCode :enable="true" v-model="SMSCode" @request="requestSMSCode"></GetSMSCode>
        </group>
        <box gap="10px 10px">
            <group>
                <x-button @click.native="nextStep" :type="buttonType">下一步</x-button>
            </group>
        </box>
    </div>
</template>

<script>
import { Group, XButton, Box } from "vux"
import { generalAlert } from  "@/common/function/func"
import GetSMSCode from "@/common/components/getSMSCode"
export default {
    name: "GetSMSCodeByOldPhoneNumber",
    components: {
        Group, XButton, Box, GetSMSCode
    },
    props: {
        phoneNumber: [String]
    },
    data() {
        return {
            SMSCode: "",
            buttonType: "default",
            alertText: ""
            // 手机号根据
        }
    },
    watch: {
        SMSCode: {
            handler(newV, oldV) {
                if (newV.length == 6) {
                    this.buttonType = "primary"
                } else {
                    this.buttonType = "default"
                }
            },
            immediate: true
        }
    },
    computed: {},
    methods: {
        requestSMSCode() {
            console.log("请求验证码！")
            this.$axios.get("/purchase/modifyuserid/step1")
            .then(res => {
                let status = res.data.status
                if (status == "success") {
                    generalAlert("短信验证码获取成功！")
                }
                if (status == "timeout") {
                    generalAlert("操作过时，请稍后重试！")
                }
            })
            .catch(err => {
                console.log(err)
                console.log("旧手机号请求验证码失败！")
            })
        },
        nextStep() {
            // console.log(this.SMSCode)
            if (this.SMSCode == "") {
                generalAlert("验证码不能为空！请重新填写！")
                return
            }
            if (this.SMSCode.length < 6) {
                generalAlert("验证码格式不正确！请重新输入！")
                return
            }
            let config = { SMSCode: this.SMSCode }
            this.$axios.post("/purchase/modifyuserid/step2", config)
            .then(res => {
                let status = res.data.status
                if (status == "success") {
                    // generalAlert("短信验证码填写正确！")
                    this.$emit("stepOneOk", { status: "success" })
                    return
                }
                if (status == "error") {
                    generalAlert("验证码填写错误！请重新填写")
                    this.$emit("stepOneOk", { status: "error" })
                    return
                }
                if (status == "timeout") {
                    generalAlert("操作过时！请稍后重试！")
                }
            })
            .catch(err => {
                console.log(err)
                console.log("Step1请求失败！")
            })
        }
    },
    created() {},
    mounted() {
        this.alertText = "是否向手机号为" + this.phoneNumber + "的手机发送验证码？"
    }
}
</script>

<style scoped>

</style>
