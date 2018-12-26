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

Mock.mock("/getVerificationCode", "get", graphicVerificationImage)
Mock.mock("/purchase/login/0", "post", loginWithPasswd)
Mock.mock("/purchase/login/1", "post", loginWithSMSCode)
Mock.mock(RegExp("/purchase/getSMSCode/" + ".*"), "get", getSMSCode)
Mock.mock("/purchase/signUp", "post", signUp)
Mock.mock("/purchase/forgetpasswd", "post", forgetPwd)
Mock.mock("/purchase/modifyusername", "post", rename)
Mock.mock("/purchase/modifypasswd", "post", repwd)
