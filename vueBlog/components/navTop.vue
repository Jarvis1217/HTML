<template>
    <div class="nav_all">
        <div class="nav">
            <img src="../assets/images/logo.png" height="50" width="50">
            <span class="nav_title">Technology blog</span>
        </div>

        <div class="nav_1">
            <form class="form-inline" @submit.prevent>
                <div class="form-group">
                    <input type="text" v-model="bTitle" placeholder="Search Blog" class="form-control" style="height: 30px">
                </div>
                <button type="button" class="btn btn-primary btn-sm" @click="Search();">🔍</button>
                <button class="nav_log btn btn-primary btn-sm" @click="login();" v-if="!logStatus">
                    {{ $t('message.loginMain') }}
                </button>
                <button class="nav_log btn btn-primary btn-sm" @click="goInfo();" v-if="logStatus">
                    {{ $t('message.InformationMain') }}
                </button>
                <!-- <select @change="changeLanguage();" v-model="lang">
                    <option value="en">English</option>
                    <option value="cn">简体中文</option>
                </select> -->
            </form>
        </div>
    </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import axios from "axios";
import data from "@/data.json";

export default {
    name: "nav",
    data() {
        return {
            lang: localStorage.lang || 'en',
            bTitle:'',
        }
    },
    methods: {
        Search:function() {
            this.$store.state.title = this.bTitle;

            this.$store.state.blogs = [];
            this.$store.state.pageList = [];

            const param = new URLSearchParams();
            param.append("pageNum","1");
            param.append("bTitle",this.bTitle);

            axios.post(data.url+"blog/page",param).then(resp => {
                this.$store.state.blogs = resp.data.list;
                for(let i = 1; i <= Math.ceil(resp.data.total/8); i++) {
                    this.$store.state.pageList.push(i);
                }
            });
        },
        login: function () {
            this.$router.push('/login')
        },
        goInfo: function () {
            this.$router.push('/info')
        },
        changeLanguage: function () {
            if (this.lang === 'cn') {
                this.$i18n.locale = 'cn'
            } else {
                this.$i18n.locale = 'en'
            }
            localStorage.setItem('lang', this.lang)// 存到localStorage中
        }
    },
    computed: {
        logStatus: function () {
            return this.$store.state.logStatus;
        }
    }
}
</script>

<style scoped>
.nav_all {
    display: flex;
}

.nav {
    background-color: black;
    width: 70%;
    display: flex;
    padding-left: 70px;
}

.nav_title {
    color: white;
    margin-top: 10px;
    font-size: larger;
}

.nav_1 {
    background-color: black;
    width: 30%;
    padding-top: 10px;
    padding-left: 70px;
}

.nav_log {
    margin-left: 15px;
}
</style>