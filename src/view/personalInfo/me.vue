<template>
    <div>
        个人信息
        <group>
            <cell title="用户名" :value="userInfo.username" @click.native="changeUsername"></cell>
            <cell title="手机号" :value="userInfo.phoneNumber" @click.native="changePhoneNumber"></cell>
            <cell title="密码" value="******" @click.native="changePassword"></cell>
        </group>

    </div>
</template>

<script>
import { Cell, Group, XInput } from "vux"
export default {
    name: "PersonalInfo",
    components: {
        Cell, Group, XInput
    },
    props: {},
    data() {
        return {
            userInfo: {
                username: "张三",
                phoneNumber: "13437283424"
            }
        }
    },
    watch: {},
    computed: {},
    methods: {
        changeUsername() {
            this.$router.push({name: "ModifyUsername", params: {username: this.userInfo.username}})
        },
        changePhoneNumber() {
            this.$router.push({name: "ModifyPhoneNumber"})
            return
        },
        changePassword() {
            this.$router.push({name: "ModifyPassword"})
        }
    },
    created() {},
    mounted() {}
}
</script>

<style scoped>

</style>
