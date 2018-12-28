<template>
    <div>
        <div>
            <icon type="success" is-msg class="remind"></icon>
            <span class="remind">手机号已经修改成功，请点击重新登录！</span>
        </div>
        <box gap="10px 10px">
            <x-button @click.native="nextStep" type="primary">重新登录</x-button>
        </box>
    </div>
</template>

<script>
import { Group, XButton, Box, Icon } from "vux"
export default {
    name: "",
    components: {
        Group, XButton, Box, Icon
    },
    props: {},
    data() {
        return {
        }
    },
    watch: {},
    computed: {},
    methods: {
        nextStep() {
            this.$router.push({ name: "Login" })
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
        margin-bottom: 15px
    }
</style>
