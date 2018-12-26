<template>
    <div>
        <group>
            <GetSMSCode :enable="enable" :countDownTime="time" v-model="inputData" @request="requestSMSCode" placeholder="请输入验证码"></GetSMSCode>
        </group>
        <br>
        <loading :show="show"></loading>
        <button @click="change">按钮</button>
        <group>
            <input-pwd title="密码" placeholder="请输入密码" v-model="password" :is-type="validPassword"></input-pwd>
        </group>
    </div>
</template>

<script>
import { Group } from "vux"
import GetSMSCode from "@/common/components/getSMSCode"
import InputPwd from "@/common/components/inputPwd"
import Loading from "@/common/components/loading"
export default {
    name: "Test",
    components: {
        GetSMSCode, Group, InputPwd, Loading
    },
    props: {},
    data() {
        return {
            enable: false,
            time: 10,
            inputData: "",
            password: "",
            validPassword: function (value) {
                var isPassword = /^(\w){6,20}$/;
                return {
                    valid: isPassword.test(value),
                    msg: "密码格式错误，密码长度必须大于等于6且小于等于20，只能包含数字、字母和下划线，区分大小写！"
                }
            },
            show: false
        }
    },
    watch: {
        inputData: function(newV, oldV) {
            console.log(this.inputData)
        }
    },
    computed: {},
    methods: {
        change() {
            console.log("改变电话号码合法性")

            // this.time = this.time + 1
            this.enable = !this.enable
            console.log(this.enable)
            console.log(this.inputData)
            console.log(this.password)
            this.show = !this.show
        },
        requestSMSCode() {
            console.log("请求验证码")
        }
    },
    created() {},
    mounted() {}
}
</script>

<style scoped>

</style>
