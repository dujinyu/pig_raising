<template>
    <div>
        <group>
            <x-input title="用户名" name="username" placeholder="请输入账号" v-model="userInfo.username" required></x-input>
        </group>
        <group>
            <x-input title="密码" name="password" placeholder="请输入密码" :type="passwordType" v-model="userInfo.password">
                <!-- <img slot="right" :src="iconSrc" style="width: 16px; height:16px;" alt=""> -->
                <span slot="right" @click="showAndHidPassword">{{ checkPassword }}</span>
            </x-input>
        </group>
        <!-- <x-button v-if="flag">hahah</x-button> -->
    </div>
</template>

<script>
import { XInput, Group, XButton, Cell, ButtonTab, ButtonTabItem, XImg } from 'vux'
export default {
    name: "Username",
    components: {
        XInput, Group, XButton, Cell, ButtonTab, ButtonTabItem, XImg
    },
    props: {},
    data() {
        return {
            userInfo: {
                username: "",
                password: ""
            },
            flag: true,
            passwordType: "password",
            checkPassword: "查看密码",
            // validUsername: function(value) {
            //     var isUserName = /^[\u4e00-\u9fa5]{2}([\u4e00-\u9fa5]|[a-zA-Z0-9]|[_]){0,8}$/;
            //     return {
            //         valid: isUsername.test(value),
            //         msg: "用户名格式错误，用户名长度必须大于等于2小于等于10，前两位必须为中文，其他位只能是中文、数字、字母和下划线，区分大小写！"
            //     }
            // }
            // iconSrc: "../../assets/images/icon_预览.png"
        }
    },
    watch: {
        "userInfo.username": function(newV, oldV) {
            this.$emit("usernameAndPassword", this.userInfo);
        },
        "userInfo.password": function(newV, oldV) {
            this.$emit("usernameAndPassword", this.userInfo);
        }

    },
    computed: {

    },
    methods: {
        showAndHidPassword() {
            if (this.flag) {
                this.passwordType = "text";
                this.checkPassword = "隐藏密码";
                this.flag = false;
            } else {
                this.passwordType = "password";
                this.checkPassword = "查看密码";
                this.flag = true;
            }
        }
    },
    created() {
        // this.$emit("usernameAndPassword", this.userInfo);
    },
    mounted() {

    }
}
</script>

<style scoped>

</style>
