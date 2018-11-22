<template>
    <div>
        <x-header>账号注册</x-header>
        <!-- 输入手机号 -->
        <group>
            <x-input
                title="手机号"
                name="mobile"
                ref="mobile"
                placeholder="请输入手机号"
                v-model="userInfo.phoneNumber"
                keyboard="number"
                mask="999 9999 9999"
                :max="13"
                is-type="china-mobile"
                required>
            </x-input>
        </group>
        <!-- 输入用户名 -->
        <group>
            <x-input title="用户名" ref="username" placeholder="请输入用户名" v-model="userInfo.username" :is-type="validUsername" required></x-input>
        </group>
        <!-- 输入密码 -->
        <group>
            <x-input title="密码" name="password" ref="password" placeholder="请输入密码"
                :type="passwordType" v-model="userInfo.password" :is-type="validPassword"
                required>
                <span slot="right" @click="showAndHidPassword">{{ checkPassword }}</span>
            </x-input>
        </group>
        <!-- 验证密码 -->
        <group>
            <x-input title="确认密码" name="password" placeholder="请确认密码" :type="confirmPasswordType" v-model="confirmPassword" required>
                <span slot="right" @click="showAndHidConfirmPassword">{{ confirmCheckPassword }}</span>
            </x-input>
        </group>
        <!-- 输入验证码 -->
        <group>
            <x-input title="验证码" class="weui-vcode" v-model="userInfo.SMSCode" placeholder="请输入验证码" required>
                <x-button slot="right" :disabled="buttonDisabled" :type="buttonType" mini @click.native="requestSMSCode" :text="buttonText"></x-button>
            </x-input>
        </group>
        <!-- 注册 -->
        <box gap="10px 10px">
            <group>
                <x-button type="primary" @click.native="register">注册</x-button>
            </group>
        </box>
        <!-- <div v-transfer-dom>
            <alert v-model="show2" :title="$t('Congratulations')" :content="$t('Your Message is sent successfully~')"></alert>
        </div> -->
    </div>
</template>

<script>
import { XHeader, Group, XInput, XButton, Box, AlertModule } from 'vux'
export default {
    name: "Register",
    // directives: {
    //     TransferDom
    // },
    components: {
        XHeader, Group, XInput, XButton, Box, AlertModule
    },
    props: {},
    data() {
        return {
            userInfo: {
                phoneNumber: "",
                username: "",
                password: "",
                SMSCode: "",
            },
            // ok: true,
            validPassword: function (value) {
                var isPassword = /^(\w){6,20}$/;
                return {
                    valid: isPassword.test(value),
                    msg: "密码格式错误，密码长度必须大于等于6且小于等于20，只能包含数字、字母和下划线，区分大小写！"
                }
            },
            validUsername: function (value) {
                var isUserName = /^[\u4e00-\u9fa5]{2}([\u4e00-\u9fa5]|[a-zA-Z0-9]|[_]){0,8}$/;
                return {
                    valid: isUserName.test(value),
                    msg: "用户名格式错误，用户名长度必须大于等于2小于等于10，前两位必须为中文，其他位只能是中文、数字、字母和下划线，区分大小写！"
                }
            },
            confirmPassword: "",
            buttonDisabled: false,
            buttonType: "primary",
            buttonText: "发送验证码",
            countDownTime: 60,
            flag: true,  //用于标志超看密码
            passwordType: "password",
            checkPassword: "查看密码",
            confirmFlag: true, //用于标志查看确认密码
            confirmPasswordType: "password",
            confirmCheckPassword: "查看密码"

        }
    },
    watch:{},
    computed: {},
    methods: {
        register() {
            // console.log(this.phoneNumber)
            this.$axios.get("http://192.168.1.109:8889/purchase/getSMSCode/" + this.userInfo.phoneNumber.split(" ").join(""))
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err)
            })
            if (this.confirmPwd()) {
                var config = {}
                config.phoneNumber = this.userInfo.phoneNumber.split(" ").join("");
                config.username = this.userInfo.username;
                config.password = this.userInfo.password;
                config.SMSCode = this.userInfo.SMSCode;
                // config.phoneNumber = config.phoneNumber.split(" ").join("");
                // console.log("register successfully!");
                console.log(config)
                // this.$axios.post("/purchase/signUp", config)
            } else {
                AlertModule.show({
                    title: "提示",
                    content: "请正确填写注册信息！"
                })
                return;
            }
        },
        // 验证注册表单内容
        confirmPwd() {
            // console.log(this.validPhoneNumber)
            //var ok = true;
            if (this.userInfo.phoneNumber == "") {
                AlertModule.show({
                    title: "提示",
                    content: "手机号不能为空！"
                });
                //ok = false;
                return;
            }else if (this.$refs.mobile.valid == false) {
                AlertModule.show({
                    title: "提示",
                    content: "手机号格式错误，请输入中国手机号！"
                });
                // ok = false;
                return;
            }
            if (this.userInfo.username == "" ) {
                AlertModule.show({
                    title: "提示",
                    content: "用户名不能为空！"
                });
                // ok = false;
                return;
            }else if (this.$refs.username.valid == false) {
                AlertModule.show({
                    title: "提示",
                    content: "用户名格式错误，用户名长度必须大于等于2小于等于10，前两位必须为中文，其他位只能是中文、数字、字母和下划线，区分大小写！"
                });
                //console.log(this.$refs.username)
                // ok =false;
                return;
            }
           if (this.userInfo.password == "") {
               AlertModule.show({
                    title: "提示",
                    content: "密码不能为空！"
                });
                // ok = false;
                return;
            } else if (this.$refs.password.valid == false) {
                AlertModule.show({
                    title: "提示",
                    content: "密码格式错误，密码长度必须大于等于6且小于等于20，只能包含数字、字母和下划线，区分大小写！"
                });
                // ok = false;
                return;
            }
            if (this.confirmPassword == "") {
                AlertModule.show({
                    title: "提示",
                    content: "确认密码不能为空，请输入确认密码！"
                });
                return;
            }
            if (!(this.userInfo.password === this.confirmPassword)) {
                AlertModule.show({
                    title: "提示",
                    content: "两次密码不一致，再次确认密码!"
                });
                this.confirmPassword = "";
            }
            if (this.userInfo.SMSCode == "") {
                AlertModule.show({
                    title: "提示",
                    content: "验证码不能为空！"
                });
            }
            return true;
        },
        requestSMSCode() {
            console.log("requestSMSCode")
            //计时禁用发送验证码功能
            this.buttonDisabled = true;
            this.buttonType = "default";
            this.countDown();
            // return;
        },
        countDown() {
            if ( this.countDownTime < 0 ) {
                this.buttonDisabled = false;
                this.buttonType = "primary";
                this.buttonText = "发送验证码";
                this.countDownTime = 60;
            } else {
                this.buttonText = this.countDownTime.toString() + "秒后重新发送";
                //console.log(this.SMSCode);
                setTimeout(() => {
                    this.countDown()
                }, 1000);
                this.countDownTime--;
            }
            // return;
        },
        //隐藏和查看密码
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
        showAndHidConfirmPassword() {
            if (this.confirmFlag) {
                this.confirmPasswordType = "text";
                this.confirmCheckPassword = "隐藏密码";
                this.confirmFlag = false;
            } else {
                this.confirmPasswordType = "password";
                this.confirmCheckPassword = "查看密码";
                this.confirmFlag = true;
            }
        }
    },
    created() {},
    mounted() {}
}
</script>

<style scoped>

</style>
// <style lang="less" scoped>
//     @header-background-color: black;
// </style>


