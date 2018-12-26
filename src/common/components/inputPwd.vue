<template>
    <!--
        该组件是密码输入组件
        需要的参数:
            title: 输入框左侧标题，String类型，默认值为“密码”
            placeholder: 占位符，String类型，默认值为“请输入密码”
            checkPwdText: type="password"时，右侧显示的文字，String类型，默认值为“查看密码”
            hidePwdText: type="text"时，右侧显示的文字，String类型，默认值为“隐藏密码”
            is-type: 传入的验证输入值的函数，Function类型，无默认值
            v-model: 监听x-input的输入值
     -->
    <div>
        <x-input :title="title"
                 ref="password"
                 :name="name"
                 :placeholder="placeholder"
                 :type="passwordType"
                 v-model="inputData"
                 @input="handleInput"
                 :is-type="isType"
                 required>
            <!-- <img slot="right" :src="iconSrc" style="width: 16px; height:16px;" alt=""> -->
            <span slot="right" @click="showAndHidePassword">{{ checkPassword }}</span>
        </x-input>
    </div>
</template>

<script>
import { XInput, XButton } from "vux"
export default {
    name: "InputPassword",
    components: {
        XInput, XButton
    },
    props: {
        title: {
            tpye: String,
            default: "密码"
        },
        name: {
            type: String,
            default: "password"
        },
        placeholder: {
            type: String,
            default: "请输入密码"
        },
        checkPwdText: {
            type: String,
            default: "查看密码"
        },
        hidePwdText: {
            type: String,
            default: "隐藏密码"
        },
        isType: {
            type: Function,
            default: (value) => {
                var isPassword = /^(\w){6,20}$/;
                return {
                    valid: isPassword.test(value),
                    msg: "密码格式错误，密码长度必须大于等于6且小于等于20，只能包含数字、字母和下划线，区分大小写！"
                }
            },
        }
    },
    data() {
        return {
            inputData: "",
            checkPassword: this.checkPwdText,
            hidePassword: this.hidePwdText,
            passwordType: "password"
        }
    },
    watch: {
        inputData: {
            handler(newV, oldV) {
                if (newV == "") {
                    this.$emit("valid", false)
                } else {
                    this.$emit("valid", this.$refs.password.valid)
                }
            },
            immediate: true
        }
    },
    computed: {},
    methods: {
        handleInput(event) {
            this.$emit("input", this.inputData)
        },
        showAndHidePassword() {
            this.$emit("request")
            if (this.passwordType === "password") {
                this.passwordType = "text";
                this.checkPassword = this.hidePwdText;
            } else if (this.passwordType === "text") {
                this.passwordType = "password";
                this.checkPassword = this.checkPwdText;
            }
        }
    },
    created() {},
    mounted() {}
}
</script>

<style scoped>

</style>
