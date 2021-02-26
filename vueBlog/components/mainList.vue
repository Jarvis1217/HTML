<template>
    <div class="main">
        <h2 v-if="!isShow"><span style="color: gray">博主很懒,暂时没有发文</span></h2>
        <table class="tbBlog table table-hover">
            <tr v-for="blog in blogs" :key="blog">
                <td style="width: 5%"></td>
                <td style="width: 95%">
                    <strong>
                        <a :href="'#/view?title='+ blog.bTitle">{{ blog.bTitle }}</a>
                    </strong><br>
                    <small>
                        发布于: {{ blog.bDate }}
                        <a href="javascript:void(0);" @click="delBlog(blog.bTitle);" v-show="logStatus" style="margin-left: 500px">
                            删除
                        </a>
                    </small>
                </td>
            </tr>
        </table>
        <div class="page">
            <ul class="pagination">
                <li><a @click="pagediv();" v-show="isShow">«</a></li>
                <li v-for="(item,index) in pageList" :key="index">
                    <a :class="active === index ? 'active' : ''" @click="clickScript(index)">{{ item }}</a>
                </li>
                <li><a @click="pageadd();" v-show="isShow">»</a></li>
            </ul>
        </div>
    </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import axios from 'axios';
import data from '../data.json';

export default {
    name: "mainList",
    data() {
        return {
            active: 0
        }
    },
    mounted() {
        const param = new URLSearchParams();
        param.append("pageNum","1");

        this.$store.state.pageList = [];

        axios.post(data.url+"blog/page",param).then(resp => {
            this.$store.state.blogs = resp.data.list;
            for(let i = 1; i <= Math.ceil(resp.data.total/8); i++) {
                this.$store.state.pageList.push(i);
            }
        });
    },
    methods: {
        clickScript: function (index) {
            this.active = index;
            const param = new URLSearchParams();
            param.append("pageNum", index + 1);
            param.append("bTitle",this.title);

            axios.post(data.url + "blog/page", param).then(resp => {
                this.$store.state.blogs = resp.data.list;
            });
        },
        pagediv: function () {
            if (this.active > 0) {
                this.active -= 1;

                const param = new URLSearchParams();
                param.append("pageNum", this.active + 1);
                param.append("bTitle",this.title);

                axios.post(data.url + "blog/page", param).then(resp => {
                    this.$store.state.blogs = resp.data.list;
                });
            }
        },
        pageadd: function () {
            if (this.active < this.pageList.slice(-1) - 1) {
                this.active += 1;

                const param = new URLSearchParams();
                param.append("pageNum", this.active + 1);
                param.append("bTitle",this.title);

                axios.post(data.url + "blog/page", param).then(resp => {
                    this.$store.state.blogs = resp.data.list;
                });
            }
        },
        delBlog:function(title) {
            const param = new URLSearchParams();
            param.append("title",title);

            // eslint-disable-next-line no-unused-vars
            axios.post(data.url+"blog/delete",param).then(resp => {
                this.$store.state.pageList = [];
                const param = new URLSearchParams();
                param.append("pageNum","1");

                axios.post(data.url+"blog/page",param).then(resp => {
                    this.$store.state.blogs = resp.data.list;
                    for(let i = 1; i <= Math.ceil(resp.data.total/8); i++) {
                        this.$store.state.pageList.push(i)
                    }
                });
            });
        },
    },
    computed: {
        logStatus: function () {
            return this.$store.state.logStatus;
        },
        isShow:function() {
            return this.pageList.length !== 0;
        },
        blogs:function() {
            return this.$store.state.blogs;
        },
        pageList:function() {
            return this.$store.state.pageList;
        },
        title:function() {
            return this.$store.state.title;
        }
    }
}
</script>

<style scoped>
    .main {
        /*border: 1px red solid;*/
        text-align: center;
        width: 800px
    }
    .tbBlog {
        text-align: left;
    }
    .page {
        /*border: 1px red solid;*/
        height: 70px;
        padding-top: 15px;
    }
    ul.pagination {
        display: inline-block;
        padding: 0;
        margin: 0;
    }

    ul.pagination li {display: inline;}

    ul.pagination li a {
        color: black;
        float: left;
        padding: 8px 16px;
        text-decoration: none;
        border-radius: 5px;
    }

    ul.pagination li a.active {
        background-color: dodgerblue;
        color: white;
        border-radius: 5px;
    }

    ul.pagination li a:hover:not(.active) {background-color: #ddd;}
</style>