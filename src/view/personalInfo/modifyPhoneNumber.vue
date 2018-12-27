<template>
    <div>
        <x-header>修改手机号</x-header>
        <flow>
            <flow-state :state="state[0]" :title="title[0]" :is-done="isDone[0]"></flow-state>

            <flow-line :tip="tips[0]" :is-done="isDone[1]"></flow-line>

            <flow-state :state="state[1]" :title="title[1]" :is-done="isDone[2]"></flow-state>

            <flow-line :tip="tips[1]" :is-done="isDone[3]"></flow-line>

            <flow-state :state="state[2]" :title="title[2]" :is-done="isDone[4]"></flow-state>
        </flow>
        <step-one v-if="isDone[0] && !isDone[2]" @stepOneOk="getStepOneStatus" :phoneNumber="phoneNumber"></step-one>
        <step-two v-if="isDone[2] && !isDone[4]"></step-two>
        <step-three v-if="isDone[4]"></step-three>
        <!-- <button @click="anniu">anniu</button> -->
    </div>
</template>

<script>
import { XHeader, Flow, FlowState, FlowLine } from "vux"
import { generalAlert } from "@/common/function/func"
import StepOne from "@/view/personalInfo/modifyPhoneNumberSteps/getSMSCodeByOldPhoneNumber"
import StepTwo from "@/view/personalInfo/modifyPhoneNumberSteps/inputNewPhoneNumber"
import StepThree from "@/view/personalInfo/modifyPhoneNumberSteps/modifyDone"
export default {
    name: "ModifyPhoneNumber",
    components: {
        XHeader, Flow, FlowState, FlowLine,
        StepOne, StepTwo, StepThree
    },
    props: {},
    data() {
        return {
            phoneNumber: this.$route.params.phoneNumber,
            state: ["1", "2", "3"],
            title: ["获取验证码", "修改手机号", "完成修改"],
            isDone: [true, false, false, false, false],
            tips: ["进行中", ""]
        }
    },
    watch: {},
    computed: {},
    methods: {
        getStepOneStatus(data) {
            console.log("tiaozhuan")
            if (data.status == "success") {
                this.$set(this.isDone, 1, true)
                this.$set(this.isDone, 2, true)
                this.$set(this.tips, 1, "进行中")
            }
            console.log(this.isDone)
            console.log(this.tips)
        },
        // anniu() {

        //     console.log(generalAlert("haha"))
        // }
    },
    created() {},
    mounted() {}
}
</script>

<style scoped>

</style>
