<template>
    <div>
        <!-- <group v-for="num in contractList" :key="num">
            <contract-demo  :contract-num="num" ></contract-demo>
        </group> -->
        <!-- <group>
            <cell v-for="num in contractList" title="合同号" :value="num" :key="num" is-link></cell>
        </group> -->

        <contract-demo v-for="num in contractList" :key="num"
                       :list="list" :showListLength="2"
                       :contractNum="num"
                       @click.native="showDetails(num)">
        </contract-demo>
        <x-button mini type="primary" class="plus-button" @click.native="addContract">+</x-button>
    </div>
</template>

<script>
import { Group, Cell, CellBox, XButton } from "vux"
import { generalAlert } from "@/common/function/func"
import ContractDemo from "./contractDemo"
export default {
    name: "Contract",
    components: {
        Group, Cell, CellBox, XButton,
        ContractDemo
    },
    props: {},
    data() {
        return {
            contractList: "",
            list: [
                {
                    label: "contract_num",
                    value: "10001"
                },
                {
                    label: "tax_payer",
                    value: "111111111"
                }
            ],
            requestDone: false
        }
    },
    watch: {
        // 留着，之后实现
        // requestDone: {
        //     handler(newV, oldV) {
        //         if (newV == true) {
        //             // let _contractList =
        //             for ( let i=0; i < this.contractList.length(); i++) {
        //                 this.$axios.post("/purchase/getContract/" + this.contractList[i])
        //                 .then(res => {

        //                 })
        //                 .catch(err => {

        //                 })
        //             }
        //         }
        //     }
        // }
    },
    computed: {},
    methods: {
        showDetails(data) {
            console.log(data)
            this.$router.push({ name: "ContractDetails", params: { contractNum: data } })
            console.log("data")
        },
        addContract() {
            this.$router.push({ name: "AddContract" })
        }
    },
    created() {},
    mounted() {
        this.$axios.get("/purchase/getContractNum")
        .then(res => {
            if (res.data.status == "timeout") {
                generalAlert("会话超时！")
                return
            } else {
                this.contractList = res.data.contractNum
                console.log("请求合同号")
                this.requestDone = true
            }
        })
        .catch(err => {
            console.log(err)
            console.log("请求所有合同号失败！")
        })
    }
}
</script>

<style scoped>
    .sub-item {
        color: #888;
    }
    .plus-button {
        border-radius: 50%;
        position: fixed;
        bottom: 55px;
        right: 5px;
        opacity: 0.6
        /* height: 60px;
        width: 60px; */
    }
</style>
