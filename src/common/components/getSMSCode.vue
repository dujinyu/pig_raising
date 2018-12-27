<template>
    <!--
        该组件是请求验证码组件
        需要参数： enable: 即验证手机号码合法性的结果。Boolean类型，默认为false，可选参数true
                  countDownTime: 发送验证码后，倒计时时间，次时间内不能发送验证码。Number类型，默认值为60
                  @request: 在button上添加请求验证码的事件
                  buttonText: 按钮上的汉字，String类型，默认为“发送验证码”
                  buttonType: 按钮类型，String类型，默认为default，可选参数为primary
                  v-model: 监听input输入的数据
                  max: 限制最大输入字符长度，Number类型，默认值为6
                  placeholder: 占位符，String类型，默认为空
     -->
    <div>
        <x-input title="验证码" class="weui-vcode" v-model="inputData" @input="handleInput" :max="max" :placeholder="placeholder">
            <x-button ref="verficationCode"
                      slot="right"
                      :type="buttonTypeInit"
                      :text="buttonTextInit"
                      :disabled="buttonDisabled"
                      @click.native="initCountDown"
                      mini>
            </x-button>
        </x-input>
    </div>
</template>

<script>
import { XInput, XButton } from "vux"
export default {
    name: "GetSMSCode",
    components: {
        XInput, XButton
    },
    props: {
        buttonText: {
            type: String,
            default: "发送验证码"
        },
        buttonType: {
            type: String,
            default: "default"
        },
        countDownTime: {
            type: Number,
            default: 60
        },
        enable: {
            type: Boolean,
            default: false
        },
        max: {
            type: Number,
            default: 6
        },
        placeholder: {
            type: String,
            default: "请输入验证码"
        }
    },
    data() {
        return {
            // buttonText: "发送验证码"
            buttonDisabled: true,
            countDownTimeInit: 60,
            buttonTypeInit: this.buttonType,
            buttonTextInit: this.buttonText,
            inputData: ""
        }
    },
    watch: {
        enable: {
            handler(newV, oldV) {
                // console.log("change")
                if (this.enable) {
                    this.buttonDisabled = false;
                    this.buttonTypeInit = "primary";
                } else {
                    this.buttonDisabled = true;
                    this.buttonTypeInit = "default";
                }
            },
            immediate: true
        },
        countDownTime: function(newV, oldV) {
            // console.log("计时改变了")
        }
    },
    computed: {
    },
    methods: {
        initCountDown() {
            // console.log("inputData" + this.inputData)
            // 自定义request事件，给button加上请求验证码的事件
            this.$emit("request")
            // console.log("点击发送验证码")
            this.buttonDisabled = true;
            this.buttonTypeInit = "default";
            this.countDown();
        },
        countDown() {
            if ( this.countDownTimeInit < 0 ) {
                this.buttonTextInit = this.buttonText;
                if (this.enable) {
                    this.buttonDisabled = false;
                    this.buttonTypeInit = "primary";
                }
                this.countDownTimeInit = this.countDownTime;
            } else {
                this.buttonTextInit = this.countDownTimeInit.toString() + "秒后重新发送";
                //console.log(this.SMSCode);
                setTimeout(() => {
                    this.countDown()
                }, 1000);
                this.countDownTimeInit--;
            }
            // return;
        },
        // v-model一般是双向绑定input事件的value数据，这里实现该组件用v-model就可以绑定input数据，不加这个代码，会失败
        handleInput(e) {
            this.$emit("input", this.inputData)
        }
    },
    created() {},
    mounted() {
        this.countDownTimeInit = this.countDownTime
    }
}
</script>

<style scoped>

</style>
