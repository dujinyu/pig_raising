<template>
    <div>
        <x-header>修改手机号</x-header>
        <flow>
            <flow-state state="1" title="paied" is-done></flow-state>
            <flow-line is-done></flow-line>

            <flow-state state="2" is-done>
                <span slot="title">Shipped</span>
            </flow-state>
            <flow-line tip="In progress"></flow-line>

            <flow-state state="3" title="Delivered"></flow-state>
            <flow-line></flow-line>

            <flow-state state="4" title="Done"></flow-state>
        </flow>
    </div>
</template>

<script>
import { XHeader, Flow, FlowState, FlowLine } from "vux"
import { generalAlert } from "@/common/function/func"
export default {
    name: "ModifyPhoneNumber",
    components: {
        XHeader, Flow, FlowState, FlowLine
    },
    props: {},
    data() {
        return {
        }
    },
    watch: {},
    computed: {},
    methods: {},
    created() {},
    mounted() {}
}
</script>

<style scoped>

</style>
