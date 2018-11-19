<template>
    <div>
        <msg title="操作成功" :description="description" :buttons="buttons" :icon="icon"></msg>
        <msg>
            <template slot="buttons">
                <x-button plain type="primary">hello</x-button>
                <x-button>world</x-button>
            </template>
        </msg>
    </div>
</template>

// <i18n>
// Yeah! You make it:
//   zh-CN: 操作成功
// Msg description:
//   zh-CN: 内容详情，可根据实际需要安排，如果换行则不超过规定长度，居中展现<a href="javascript:void(0);">文字链接</a>
// Primary button:
//   zh-CN: 推荐操作
// Secondary button:
//   zh-CN: 辅助操作
</i18n>

<script>
import { Msg, XButton } from 'vux'
export default {
    name: "Vux",
    components: {
        Msg,
        XButton
    },
    data() {
        return {
            description: '内容详情，可根据实际需要安排，如果换行则不超过规定长度，居中展现<a href="javascript:void(0);">文字链接</a>',
            icon: '',
            buttons: [{
                type: 'primary',
                text: 'Primary button',
                onClick: this.changeIcon.bind(this)
            }, {
                type: 'default',
                text: 'Secondary button',
                link: '/demo'
            }]
        }
    },
    methods: {
        changeIcon () {
            if (!this.icon || this.icon === 'success') {
                this.icon = 'warn'
                return
            }
            if (this.icon === 'warn') {
                this.icon = 'info'
                return
            }
            if (this.icon === 'info') {
                this.icon = 'waiting'
                return
            }
            if (this.icon === 'waiting') {
                this.icon = 'success'
            }
        }
    }
}
</script>

<style scoped>

</style>



