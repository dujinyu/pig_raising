<template>
    <div>
        <x-header :left-options="{showBack: false}">中畜智联</x-header>
        <router-view :style="routerViewClass"></router-view>
        <tabbar v-model="index">
            <tabbar-item>
                <span slot="label">猪场</span>
            </tabbar-item>
            <tabbar-item>
                <span slot="label">合同</span>
            </tabbar-item>
            <tabbar-item>
                <span slot="label">个人</span>
            </tabbar-item>
        </tabbar>
    </div>
</template>

<script>
import { XHeader, Tabbar, TabbarItem, ViewBox } from "vux"
export default {
    name: "Home",
    components: {
        XHeader, Tabbar, TabbarItem, ViewBox
    },
    props: {},
    data() {
        return {
            index: 0,
            routerViewClass: {
                height: "",
                overflow: "scroll"
            }
        }
    },
    watch:{
        index: {
            handler(newV, oldV) {
                if (newV == 0) {
                    this.$router.replace({path: "/home/pigfarm"})
                } else if (newV == 1) {
                    this.$router.replace({path: "/home/contract"})
                } else if (newV == 2) {
                    this.$router.replace({path: "/home/personal-info"})
                }
            },
            immediate: true
        }
    },
    computed: {},
    methods: {
        setHeight() {
            this.routerViewClass.height = window.innerHeight - 96 + "px"
            console.log(this.routerViewClass)
        }
    },
    created() {},
    mounted() {
        this.setHeight()
    }
}
</script>

<style scoped>

</style>
