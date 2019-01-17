<template>
    <div>
        <x-header>修改密码</x-header>
        <group>
            <input-pwd title="旧密码" v-model="oldPwd" @valid="validOldPwd"></input-pwd>
        </group>
        <group>
            <input-pwd title="新密码" v-model="newPwd" @valid="validNewPwd"></input-pwd>
        </group>
        <group>
            <input-pwd title="确认新密码" v-model="confirmNewPwd" @valid="validConfirmNewPwd"></input-pwd>
        </group>
        <div class="remind">
            修改密码需谨慎，一定牢记新密码
        </div>
        <box gap="10px 10px">
            <x-button type="primary" @click.native="modify">确认修改密码</x-button>
        </box>
        <loading :show="show"></loading>
    </div>
</template>

<script>
import { Group, XInput, XButton, Box, XHeader } from "vux"
import InputPwd from "@/common/components/inputPwd"
import { generalAlert } from "@/common/function/func"
import Loading from "@/common/components/loading"
export default {
    name: "",
    components: {
        Group, XInput, XButton, InputPwd, Box, XHeader, Loading
    },
    props: {},
    data() {
        return {
            oldPwd: "",
            newPwd: "",
            confirmNewPwd: "",
            oldPwdFlag: false,
            newPwdFlag: false,
            confirmNewPwdFlag: false,
            show: false,
            modifypasswdURL: "/purchase/modifypasswd"
        }
    },
    watch: {},
    computed: {},
    methods: {
        modify() {
            if (this.confirm()) {
                this.show = true
                let config = {
                    oldpasswd: this.oldPwd,
                    newpasswd: this.confirmNewPwd
                }
                this.$post(this.modifypasswdURL, config)
                .then(res => {
                    this.show = false
                    let status = res.data.status
                    if (status == "success") {
                        // 清除token等缓存信息
                        generalAlert("新密码设置成功！请重新登录！")
                        this.$router.push({name: "Login"})
                    } else if (status == "error") {
                        generalAlert("旧密码填写错误！请重新填写！")
                    } else if (status == "warn") {
                        generalAlert("新密码设置失败，请稍后重试！")
                    } else if (status == "timeout") {
                        generalAlert("操作过时，请稍受重新操作")
                    }
                })
                .catch(err => {
                    this.show = false
                    console.log(err)
                    console.log("新密码设置请求失败！")
                })
            }
        },
        confirm() {
            if (this.oldPwd == "") {
                generalAlert("旧密码不能为空！请重新输入！")
                return false
            }
            if (!this.oldPwdFlag) {
                generalAlert("旧密码格式不正确！请重新输入！")
                return false
            }
            if (this.newPwd == "") {
                generalAlert("新密码不能为空！请重新输入！")
                return false
            }
            if (!this.newPwdFlag) {
                generalAlert("新密码格式不正确！请重新输入！")
                return false
            }
            if (this.confirmNewPwd == "") {
                generalAlert("确认新密码不能为空！请重新输入！")
                return false
            }
            if (!this.confirmNewPwdFlag) {
                generalAlert("确认新密码格式不正确！请重新输入！")
                return false
            }
            if (this.newPwd != this.confirmNewPwd) {
                // this.confirmNewPwd = "" // 执行这句，样式上面，并没有清零
                generalAlert("新密码两次输入不一致！请重新输入!")
                return false
            }
            return true
        },
        validOldPwd(data) {
            this.oldPwdFlag = data
        },
        validNewPwd(data) {
            this.newPwdFlag = data
        },
        validConfirmNewPwd(data) {
            this.confirmNewPwdFlag = data
        }
    },
    created() {},
    mounted() {}
}
</script>

<style scoped>
    .remind {
        display: flex;
        justify-content: space-around;
        margin-top: 15px;
        margin-bottom: 15px;
        color: red
    }
</style>
