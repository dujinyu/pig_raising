<template>
    <div>
        <group>
            <x-input title="手机号"
                ref="mobile"
                name="mobile"
                placeholder="请输入手机号"
                v-model="userInfo.phoneNumber"
                :max="13"
                keyboard="number"
                mask="999 9999 9999"
                is-type="china-mobile"
                required>
            </x-input>
        </group>
        <group>
            <x-input title="密码" name="password" placeholder="请输入密码" :type="passwordType" v-model="userInfo.password">
                <!-- <img slot="right" :src="iconSrc" style="width: 16px; height:16px;" alt=""> -->
                <span slot="right" @click="showAndHidPassword">{{ checkPassword }}</span>
            </x-input>
        </group>
        <group>
            <x-input title="图形验证码" placeholder="请输入验证码" v-model="userInfo.graVerCode">
                <img slot="right-full-height" :src="graphicVerificationCode" @click="getVerImg" alt="点击重新加载">
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
                phoneNumber: "134 3728 3424",
                password: "123456",
                graVerCode: ""
            },
            flag: true,
            passwordType: "password",
            checkPassword: "查看密码",
            graphicVerificationCode: "",
            getGraphicVerificationCodeURL: "/getVerificationCode"
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
        "userInfo.phoneNumber": function(newV, oldV) {
            this.$emit("phoneNumberAndPassword", this.userInfo);
            this.$emit("validPhoneNumber", this.$refs.mobile.valid);
        },
        "userInfo.password": function(newV, oldV) {
            this.$emit("phoneNumberAndPassword", this.userInfo);
        },
        "userInfo.graVerCode": function(newV, oldV) {
            this.$emit("phoneNumberAndPassword", this.userInfo);
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
        },
        getVerImg() {
            this.$get(this.getGraphicVerificationCodeURL)
            .then(res => {
                this.graphicVerificationCode = res.data.img
            })
            .catch(err => {
                console.log(err)
                console.log("图形验证码请求错误")
            })
        }
    },
    created() {
        // this.$emit("usernameAndPassword", this.userInfo);
        this.getVerImg()
    },
    mounted() {

    }
}
</script>

<style scoped>

</style>
