<template>
    <div>
        <x-header>合同详情</x-header>
        <!-- {{ contractNum }} -->
        <!-- <x-table :cell-bordered="false" style="background-color:#fff;">
            <thead>
                <tr style="background-color: #F7F7F7">
                    <th style="text-align: left">信息</th>
                    <th>数据</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(value, key) in contractDetails" :key="key">
                    <td style="text-align: left">{{ key }}</td>
                    <td>{{ value }}</td>
                </tr>
            </tbody>
        </x-table> -->
        <form-preview :header-label="headerLabel" :header-value="contractNum" :body-items="detailsList" :footer-buttons="buttons1"></form-preview>
    <br>
    </div>
</template>

<script>
import { XHeader, XTable, FormPreview } from "vux"
import { generalAlert } from "@/common/function/func"
export default {
    name: "ContractDetails",
    components: {
        XHeader, XTable, FormPreview
    },
    props: {},
    data() {
        return {
            contractNum: "",
            contractDetails: "",
            headerLabel: "合同号",
            detailsList: [],
            _detailsList: [
                {
                    label: "纳税人识别号",
                    value: ""
                },
                {
                    label: "公司名",
                    value: ""
                },
                {
                    label: "法人",
                    value: ""
                },
                {
                    label: "负责人",
                    value: ""
                },
                {
                    label: "负责人电话",
                    value: ""
                },
                {
                    label: "公司地址",
                    value: ""
                },
                {
                    label: "合同日期",
                    value: ""
                },
                {
                    label: "合同有效期",
                    value: ""
                },
                {
                    label: "购买设备数量",
                    value: ""
                },
                {
                    label: "法人号码",
                    value: ""
                }
            ],
            // list: [{
            //     label: '商品',
            //     value: '电动打蛋机'
            // }, {
            //     label: '标题标题',
            //     value: '名字名字名字'
            // }, {
            //     label: '标题标题',
            //     value: '很长很长的名字很长很长的名字很长很长的名字很长很长的名字很长很长的名字'
            // }],
            buttons1: [{
                style: 'default',
                text: '删除合同',
                onButtonClick: this.deleteContract
            }, {
                style: 'primary',
                text: "修改合同",
                onButtonClick: this.modifyContract
            }],
            getContractURL: "/purchase/getContract/"
        }
    },
    watch: {},
    computed: {},
    methods: {
        getContractDetails(contractNum) {
            this.$get(this.getContractURL + contractNum)
            .then(res => {
                let status = res.data.status
                if (status == "warn") {
                    generalAlert("合同详情获取失败！")
                    return
                }
                if (status == "success") {
                    console.log(res.data)
                    let temp = res.data
                    delete temp.status
                    delete temp.contract_num
                    // this.contractDetails = temp
                    for (var key in temp) {
                        let tempObject = {
                            label: key,
                            value: temp[key]
                        }
                        this.detailsList.push(tempObject)
                    }
                    return
                }
            })
            .catch(err => {
                console.log(err)
                console.log("合同详情请求失败！")
            })
        },
        deleteContract() {
            console.log("删除合同")
        },
        modifyContract() {
            console.log("修改合同")
        }
    },
    created() {
        this.contractNum = this.$route.params.contractNum
        this.getContractDetails(this.contractNum)
    },
    mounted() {}
}
</script>

<style scoped>

</style>
