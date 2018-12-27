<template>
    <!--
        show: 控制loading是否显示，Boolean类型，默认false不显示，可选true
        text：loading时显示的文字样式，String类型，默认“加载中”
     -->
    <div>
        <div v-transfer-dom>
            <loading :show="show" :text="text"></loading>
        </div>
    </div>
</template>

<script>
import { Loading, TransferDomDirective as TransferDom } from "vux"
export default {
    name: "",
    directives: {
        TransferDom
    },
    components: {
        Loading
    },
    props: {
        show: {
            type: Boolean,
            default: false
        },
        text: {
            type: String,
            default: "加载中"
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
