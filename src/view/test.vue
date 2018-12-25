<template>
    <div>
        <group>
            <GetSMSCode :enable="enable" :countDownTime="time" v-model="inputData" @request="requestSMSCode" placeholder="请输入验证码"></GetSMSCode>
        </group>
        <br>
        <button @click="change">按钮</button>
    </div>
</template>

<script>
import { Group } from "vux"
import GetSMSCode from "@/common/components/getSMSCode"
export default {
    name: "Test",
    components: {
        GetSMSCode, Group
    },
    props: {},
    data() {
        return {
            enable: false,
            time: 10,
            inputData: ""
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
