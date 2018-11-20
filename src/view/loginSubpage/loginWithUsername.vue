<template>
    <div>
        <group>
            <x-input title="用户名" name="username" placeholder="请输入账号" v-model="userInfo.username"></x-input>
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
            checkPassword: "查看密码"
            // iconSrc: "../../assets/images/icon_预览.png"
        }
    },
    watch:{},
    computed: {},
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
    created() {},
    mounted() {

    }
}
</script>

<style scoped>

</style>
