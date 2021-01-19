<link rel="stylesheet" href="../../node_modules/bootstrap/dist/css/bootstrap.css">
<template>
    <div id="logForm">

        <h2 class="title">Login</h2>
        <form class="form-inline">
            <div class="form-group">
                <label>用户名:</label> &nbsp;&nbsp;
                <input type="text" required="required" v-model="uname" class="form-control"/>
            </div>
        </form>
        <br>
        <form class="form-inline">
            <div class="form-group">
                <label style="margin-left: 11px">密码:</label> &nbsp;&nbsp;&nbsp;
                <input type="password" required="required" v-model="upass" class="form-control"/>
            </div>
        </form>
        <br>
        <form class="form-inline">
            <div class="form-group">
                <input type="button" value="登录" @click="log();" class="mybtn btn btn-info"/>
            </div>
        </form>

    </div>
</template>

<script>
import axios from 'axios'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import Cookies from 'js-cookie'

export default {
    name: "login",
    data() {
        return {
            uname: "",
            upass: ""
        }
    },
    methods: {
        log: function () {
            if (this.uname.trim() === "" || this.upass.trim() === "") {
                alert("请输入完整信息");
            } else {

                const param = new URLSearchParams();
                param.append("uname", this.uname);
                param.append("upass", this.upass);

                axios.post("http://192.168.3.222:8088/sk/check", param).then((resp) => {
                    if (resp.data === "用户名有误")
                        alert("用户名有误，请检查后登录");

                    else if (resp.data === "密码有误")
                        alert("密码有误，请检查后登录");

                    else if (resp.data === "index") {
                        Cookies.set("User", "index")
                        this.$router.push("index");

                    } else if (resp.data === "admin") {
                        Cookies.set("User", "admin")
                        this.$router.push("admin");
                    }
                });
            }
        }
    }
}
</script>

<style>
    html, body {
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
        background-color: #8000ff;
        color: white;
    }
    #logForm {
        width: 600px;
        text-align: center;
        display: block;
        position: relative;
        top: 50%;
        margin: 150px auto auto;
    }

    .mybtn {
        width: 100px;
        margin-left: 110px;
        margin-top: 5px;
    }

    .title {
        margin-left: 8px;
        margin-bottom: 30px;
    }

    .form-inline {
        margin-left: 150px;
    }
</style>