<template>
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
            type: Function
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
        },
    },
    created() {},
    mounted() {}
}
</script>

<style scoped>

</style>
