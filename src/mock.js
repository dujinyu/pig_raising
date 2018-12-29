const Mock = require("mockjs");

const Random = Mock.Random;

const graphicVerificationImage = function() {
    let img = Random.dataImage("70x40", "mock的图片！")
    return {img: img}
}

const loginWithPasswd = function(data) {
    console.log(data)
    return {
        status: "success"
    }
}

const loginWithSMSCode = function(data) {
    console.log(data)
    return {
        status: "success"
    }
}
const getSMSCode = function() {
    return {
        status: "success"
    }
}

const signUp = function(data) {
    return {
        status: "success"
    }
}

const forgetPwd = function(data) {
    return {
        status: "success"
    }
}

const rename = function(data) {
    return {
        status: "success"
    }
}

const repwd = function(data) {
    return {
        status: "success"
    }
}

const step1 = function() {
    return {
        status: "success"
    }
}

const step2 = function(data) {
    return {
        status: "success"
    }
}

const step3 = function(data) {
    return {
        status: "success"
    }
}

const contractNum = function() {
    return {
        "contractNum": [10001, 10002, 10003, 10004, 10005, 10006]
    }
}

const details = function() {
    return {
        "status": "success",
        "contract_num": "111",
        "tax_payer": "222",
        "company_name": "333",
        "legal_person": "444",
        "principal_person": "555",
        "principal_person_phone": "666",
        "company_addr": "777",
        "contract_date": "888",
        "expiry_time": "999",
        "purcha_num": "101010",
        "legal_person_phone": "111111"
    }
}

const addContract = function(data) {
    return {
        status: "success"
    }
}

const Logout = function() {
    return {
        status: "success"
    }
}

Mock.mock("/getVerificationCode", "get", graphicVerificationImage)
Mock.mock("/purchase/login/0", "post", loginWithPasswd)
Mock.mock("/purchase/login/1", "post", loginWithSMSCode)
Mock.mock(RegExp("/purchase/getSMSCode/" + ".*"), "get", getSMSCode)
Mock.mock("/purchase/signUp", "post", signUp)
Mock.mock("/purchase/forgetpasswd", "post", forgetPwd)
Mock.mock("/purchase/modifyusername", "post", rename)
Mock.mock("/purchase/modifypasswd", "post", repwd)
Mock.mock("/purchase/modifyuserid/step1", "get", step1)
Mock.mock("/purchase/modifyuserid/step2", "post", step2)
Mock.mock("/purchase/modifyuserid/step3", "post", step3)
Mock.mock("/purchase/getContractNum", "get", contractNum)
Mock.mock(RegExp("/purchase/getContract/" + ".*"), "get", details)
Mock.mock("/purchase/addContract", "post", addContract)
Mock.mock("/purchase/logout", "get", Logout)
