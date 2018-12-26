<template>
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
