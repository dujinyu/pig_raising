<template>
    <div>
        <x-header>添加合同</x-header>
        <div class="context">
            <group>
                <x-input v-for="(v, k) in title" :title="v" :key="k" v-model="contract[k]"></x-input>
            </group>
            <box gap="10px 10px">
                <x-button @click.native="addContract" type="primary">添加合同</x-button>
            </box>
        </div>

    </div>
</template>

<script>
import { XHeader, Group, XInput, XButton, Box } from "vux"
import { generalAlert } from "@/common/function/func"
export default {
    name: "AddContract",
    components: {
        XHeader, Group, XInput, XButton, Box
    },
    props: {},
    data() {
        return {
            contract: {
                contract_num: "",
                tax_payer: "",
                company_name: "",
                legal_person: "",
                principal_person: "",
                principal_person_phone: "",
                company_addr: "",
                contract_date: "",
                expiry_time: "",
                purcha_num: "",
                legal_person_phone: ""
            },
            title: {
                contract_num: "合同号:",
                tax_payer: "纳税人识别号:",
                company_name: "公司名:",
                legal_person: "法人:",
                principal_person: "负责人:",
                principal_person_phone: "负责人电话:",
                company_addr: "公司地址:",
                contract_date: "合同日期:",
                expiry_time: "合同有效期:",
                purcha_num: "购买设备数量:",
                legal_person_phone: "法人联系方式:"
            }
        }
    },
    watch: {},
    computed: {},
    methods: {
        addContract() {
            console.log(this.contract)
            let config = this.contract
            this.$axios.post("/purchase/addContract", config)
            .then(res => {
                let status = res.data.status
                if (status == "success") {
                    generalAlert("合同添加成功!")
                    return
                }
                if (status == "warn") {
                    generalAlert("合同添加失败！")
                    return
                }
                if (status == "timeout") {
                    generalAlert("会话超时，请稍后重试！")
                    return
                }
            })
            .catch(err => {
                console.log(err)
                console.log("添加合同请求失败！")
            })
        }
    },
    created() {},
    mounted() {}
}
</script>

<style scoped>
    .context {
        height: 621px;
        overflow: scroll;
    }
</style>
