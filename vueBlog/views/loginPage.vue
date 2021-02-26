<template>
    <div class="login">
        <h2>Welcome Back</h2> <br>
        <form class="form-inline" style="margin-left: 40%" @submit.prevent>
            <div class="form-group">
                <input type="password" class="form-control" placeholder="Pass token" v-model="token">
            </div>
            <button class="btn btn-primary" style="margin-left: 15px" @click="tokenCheck();">Check</button>
        </form> <br>
        <button class="btn btn-danger" style="width: 80px" @click="goBack();">Back</button>
    </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import data from '../data.json'

import axios from 'axios';

export default {
    name: "loginPage",
    data() {
       return {
           token: ''
       }
    },
    methods: {
        tokenCheck:function() {
            const param = new URLSearchParams();
            param.append("token",this.token);
            axios.post(data.url+"user/login",param).then((resp) => {
                if(resp.data === true) {
                    sessionStorage.setItem("logStatus","true");
                    this.$store.commit('statusChange');
                    this.$router.push('/index');
                }else {
                    alert("通行口令有误");
                }
            });
        },

        goBack:function() {
            this.$router.push('/index');
        }
    }
}
</script>

<style scoped>
    .login {
        /*border: 1px red solid;*/
        width: 80%;
        margin: auto;
        text-align: center;
        padding-top: 100px
    }
</style>