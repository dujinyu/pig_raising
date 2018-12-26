<template>
    <div>
        <x-header>修改用户名</x-header>
        <group>
            <x-input ref="username" title="新用户名" v-model="username" :is-type="validUsername"></x-input>
        </group>
        <div class="remind">
            好的名字可以让你的朋友更容易记住你
        </div>
        <box gap="10px 10px">
            <group>
                <x-button type="primary" @click.native="modify">确认修改</x-button>
            </group>
        </box>
    </div>
</template>

<script>
import { XHeader, XInput, Group, XButton, Box } from "vux"
import { generalAlert } from "@/common/function/func"
export default {
    name: "",
    components: {
        XHeader, XInput, Group, XButton, Box
    },
    props: {},
    data() {
        return {
            username: this.$route.params.username,
            validUsername: function (value) {
                var isUserName = /^[\u4e00-\u9fa5]{2}([\u4e00-\u9fa5]){0,3}$/;
                return {
                    valid: isUserName.test(value),
                    msg: "用户名格式错误，用户名长度必须大于等于2小于等于5，只能是中文！"
                }
            }
        }
    },
    watch: {},
    computed: {},
    methods: {
        modify() {
            if (this.username == this.$route.params.username) {
                generalAlert("用户名未发生变化，不用修改！")
                return
            }
            if (this.$refs.username.valid == false) {
                generalAlert("用户名格式不正确！请再次输入！")
                return
            }
            let config = {
                userName: this.username
            }
            this.$axios.post("/purchase/modifyusername", config)
            .then(res => {
                let status = res.data.status
                if (status == "success") {
                    generalAlert("新用户名设置成功！")
                } else if (status == "warn") {
                    generalAlert("新用户名设置失败！稍后请重新设置！")
                } else if (status == "timeout") {
                    generalAlert("操作过时，请重新设置！")
                }
            })
            .catch(err => {
                console.log(err)
                console.log("用户名修改请求错误！")
            })
        }
    },
    created() {},
    mounted() {}
}
</script>

<style scoped>
    .remind {
        display: flex;
        justify-content: space-around;
        margin-top: 15px;
        color: gray
    }
</style>
