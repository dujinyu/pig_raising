<template>
    <div>
        <x-header>忘记密码</x-header>
        <group>
            <x-input
                title="手机号"
                ref="mobile"
                name="mobile"
                placeholder="请输入手机号"
                v-model="phoneNumber"
                keyboard="number"
                mask="999 9999 9999"
                :max="13"
                is-type="china-mobile">
            </x-input>
        </group>

        <group>
            <input-pwd title="输入新密码" v-model="newPwd" placeholder="新密码" :is-type="validPassword" @valid="getValidValue"></input-pwd>
        </group>

        <group>
            <input-pwd title="确认密码" v-model="confirmPwd" placeholder="确认密码"></input-pwd>
        </group>

        <group>
            <GetSMSCode :enable="enable" v-model="SMSCode" @request="requestSMSCode"></GetSMSCode>
        </group>
        <box gap="10px 10px">
            <group>
                <x-button type="primary" @click.native="findBackPwd" :text="findBackBtnText"></x-button>
            </group>
        </box>
    </div>
</template>

<script>
import { XHeader, Group, XInput, XButton, Box } from 'vux'
import GetSMSCode from "@/common/components/getSMSCode"
import InputPwd from "@/common/components/inputPwd"
import { generalAlert } from "@/common/function/func"
export default {
    name: "ForgetPassword",
    components: {
        XHeader, Group, XInput, XButton, Box, GetSMSCode, InputPwd
    },
    props: {},
    data() {
        return {
            phoneNumber: "",
            SMSCode: "",
            enable: "",
            newPwd: "",
            confirmPwd: "",
            validPassword: function (value) {
                var isPassword = /^(\w){6,20}$/;
                return {
                    valid: isPassword.test(value),
                    msg: "密码格式错误，密码长度必须大于等于6且小于等于20，只能包含数字、字母和下划线，区分大小写！"
                }
            },
            valid: false,
            findBackBtnText: "找回设置新密码"
        }
    },
    watch: {
        phoneNumber: function() {
            this.enable = this.$refs.mobile.valid
        }
    },
    computed: {},
    methods: {
        findBackPwd() {
            // console.log("zhaohui")
            if (this.confirm()) {
                console.log("findBackPwd")
                let config = {
                    tel: this.phoneNumber.split(" ").join(),
                    SMSCode: this.SMSCode,
                    newpasswd: this.confirmPwd
                }
                // console.log(config)
                this.$axios.post("/purchase/forgetpasswd", config)
                .then(res => {
                    let status = res.data.status
                    if (status === "success") {
                        generalAlert("新密码设置成功！请重新登录！")
                        this.$router.push({path: "/login"})
                    }
                    if (status == "error") {
                        generalAlert("验证码填写错误！请重新填写！")
                    }
                    if (status == "warn") {
                        generalAlert("新密码设置失败，请稍后再次设置！")
                    }
                })
                .catch(err => {
                    console.log(err)
                    console.log("密码找回请求错误")
                })
            }

        },
        requestSMSCode() {
            if (this.$refs.mobile.valid == true) {
                this.$axios.get("/purchase/getSMSCode/" + this.phoneNumber.split(" ").join("") + "N")
                .then(res => {
                    let status = res.data.status
                    if (status == "success") {
                        generalAlert("验证码发送成功！")
                    }
                    if (status == "telnotexist") {
                        generalAlert("手机号未注册，请填写正确手机号！")
                    }
                })
                .catch(err => {
                    console.log(err)
                    console.log("验证码请求错误")
                })
            }
        },
        confirm() {
            let flag = true;
            let contents = ""
            if (this.phoneNumber == "") {
                contents = "手机号不能为空！"
                flag = !flag
            } else if (!this.$refs.mobile.valid) {
                contents = "手机号格式错误!"
                flag = !flag
            } else if (this.newPwd == "") {
                contents = "密码不能为空！"
                flag = !flag
            } else if (!this.valid ) {
                contents = "密码格式错误！"
                flag = !flag
            } else if (this.confirmPwd == "") {
                contents = "确认密码不能为空！"
                flag = !flag
            } else if (!(this.newPwd == this.confirmPwd)) {
                contents = "两次密码输入不一致！"
                flag = !flag
            } else if (this.SMSCode == "") {
                contents = "验证码不能为空！"
                flag = !flag
            } else if (!(this.SMSCode.length == 6)) {
                contents = "验证码格式不正确"
                flag = !flag
            }
            if (flag == false) {
                generalAlert(contents + "请重新输入！")
            }
            return flag
        },
        getValidValue(data) {
            this.valid = data
        }
    },
    created() {},
    mounted() {}
}
</script>

<style scoped>

</style>
