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
            <GetSMSCode :enable="enable" @request="requestSMSCode" v-model="userInfo.SMSCode"></GetSMSCode>
        </group>
        <box gap="10px 10px">
            <group>
                <x-button @click.native="nextStep" type="primary">下一步</x-button>
            </group>
            <group>
                <x-button @click.native="prevStep" type="primary">上一步</x-button>
            </group>
        </box>

    </div>
</template>

<script>
import { Group, XButton, XInput, Box } from "vux"
import GetSMSCode from "@/common/components/getSMSCode"
import { generalAlert } from "@/common/function/func"
export default {
    name: "",
    components: {
        Group, XButton, XInput, Box,
        GetSMSCode
    },
    props: {},
    data() {
        return {
            userInfo: {
                phoneNumber: "",
                SMSCode: ""
            },
            enable: false,
            step3URL: "/purchase/modifyuserid/step3",
            getSMSCodeURL: "/purchase/getSMSCode/"
        }
    },
    watch: {
        "userInfo.phoneNumber": {
            handler(newV, oldV) {
                if (newV == "") {
                    this.enable = false
                } else {
                    this.enable = this.$refs.mobile.valid
                }
            },
            immediate: true
        }
    },
    computed: {},
    methods: {
        nextStep() {
            if (this.userInfo.phoneNumber == "") {
                generalAlert("新手机号不能为空！")
                return
            }
            if (!this.$refs.mobile.valid) {
                generalAlert("新手机号格式不正确！请重新输入！")
                return
            }
            if (this.userInfo.SMSCode == "") {
                generalAlert("验证码不能为空！")
                return
            }
            if (this.userInfo.SMSCode.length < 6) {
                generalAlert("验证码格式不正确，请重新输入！")
                return
            }
            let config = {
                tel: this.userInfo.phoneNumber,
                SMSCode: this.userInfo.SMSCode
            }
            this.$post(this.step3URL, config)
            .then(res => {
                console.log(res.data)
                let status = res.data.status
                if (status == "success") {
                    generalAlert("新手机号修改成功！请重新登录！")
                    // 删除token等信息
                    // this.$router.push({name: "Login"})
                    this.$emit("stepTwoOk", {status: "success"})
                }
                if (status == "error") {
                    generalAlert("验证码填写错误！请重新填写！")
                    return
                }
                if (status == "warn") {
                    generalAlert("修改手机号失败！请稍后重试！")
                    return
                }
                if (status == "timeout") {
                    generalAlert("操作过时，请稍后重试！")
                    return
                }
            })
            .catch(err => {
                console.log(err)
                console.log("新手机号验证码请求失败！")
            })
            return
        },
        requestSMSCode() {
            if (this.userInfo.phoneNumber != "" && this.$refs.mobile.valid) {
                this.$get(this.getSMSCodeURL + this.userInfo.phoneNumber.split(" ").join("") + "L")
                .then(res => {
                    console.log(res.data)
                    let status = res.data.status
                    if (status == "success") {
                        generalAlert("验证码发送成功！")
                    }
                    if (status == "telhasregisted") {
                        generalAlert("该手机号已被注册！")
                    }
                })
                .catch(err => {
                    console.log(err)
                    console.log("新手机号验证码请求失败！")
                })
            } else {
                if (this.userInfo.phoneNumber == "") {
                    generalAlert("新手机号不能为空！")
                }
                if (!this.$refs.mobile.valid) {
                    generalAlert("新手机号格式不正确！请重新输入！")
                }
            }
            return
        },
        prevStep() {
            this.$emit("prevStep")
        }
    },
    created() {},
    mounted() {}
}
</script>

<style scoped>

</style>
