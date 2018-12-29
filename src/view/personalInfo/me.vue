<template>
    <div>
        个人信息
        <group>
            <cell title="用户名" :value="userInfo.username" @click.native="changeUsername" is-link></cell>
            <cell title="手机号" :value="userInfo.phoneNumber.substring(0, 3) + ' ' + userInfo.phoneNumber.substring(3, 7) + ' ' + userInfo.phoneNumber.substring(7)" @click.native="changePhoneNumber" is-link></cell>
            <cell title="密码" value="******" @click.native="changePassword" is-link></cell>
        </group>
        <group>
            <cell title="注销" @click.native="logout"></cell>
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
            this.$router.push({name: "ModifyPhoneNumber", params: {phoneNumber: this.userInfo.phoneNumber}})
            return
        },
        changePassword() {
            this.$router.push({name: "ModifyPassword"})
        },
        logout() {
            this.$axios.get("/purchase/logout")
            .then(res => {
                if (res.data.status == "success") {
                    this.$router.push({ name: "Login" })
                }
            })
        }
    },
    created() {},
    mounted() {}
}
</script>

<style scoped>

</style>
