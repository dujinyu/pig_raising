<template>
    <div>
        <msg :title="title" :description="description" :buttons="buttons" :icon="icon"></msg>
    </div>
</template>

<script>
import { Msg } from "vux"
export default {
    name: "",
    components: {
        Msg
    },
    props: {},
    data() {
        return {
            description: "手机号已经修改成功，请点击重新登录！",
            buttons: [
                {
                    type: "primary",
                    text: "重新登录",
                    onClick: this.nextStep.bind(this)
                }
            ],
            title: "操作成功",
            icon: "success"
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
