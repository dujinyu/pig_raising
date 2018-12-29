<template>
    <div>
        <group>
            <cell :title="title" :value="contractNum"></cell>
            <cell-form-preview :list="list.slice(0, showListLength)"></cell-form-preview>
        </group>
    </div>
</template>

<script>
import { Cell, CellFormPreview, Group } from "vux"
export default {
    name: "ContractDemo",
    components: {
        Cell, CellFormPreview, Group
    },
    props: {
        contractNum: {
            type: Number,
        },
        title: {
            type: String,
            default: "合同号"
        },
        list: {
            type: Array
        },
        showListLength: {
            type: Number,
            default: 1
        }
    },
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
