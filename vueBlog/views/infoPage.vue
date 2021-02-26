<template>
    <table class="tbody">
        <tr>
            <td>token</td>
            <td>
                <input type="text" :disabled="able" v-model="newToken">
            </td>
            <td>
                <button class="btn btn-danger btn-sm" @click="changeToken();" v-if="able">修改口令</button>
                <button class="btn btn-primary btn-sm" @click="changeTokenConfirm();" v-if="!able">提交变更</button>
            </td>
        </tr>

        <tr>
            <td>
                blogCount
            </td>
            <td>
                <input type="text" disabled="disabled" v-model="count">
            </td>
            <td>
                <button class="btn btn-primary btn-sm" @click="pushBlog();">添加博客</button>
            </td>
        </tr>
    </table> <br>
    <div style="text-align:center">
        <button class="btn btn-primary" @click="goBack();">返回文章列表</button>
    </div>
</template>

<script>
import axios from "axios";
import data from '../data.json';

export default {
    name: "infoPage",
    data() {
        return {
            able: true,
            count: '',
            newToken: ''
        }
    },
    mounted() {
      axios.get(data.url+"user/queryToken").then(resp => {
          this.newToken = resp.data;
      });
      axios.get(data.url+"blog/count").then(resp => {
          this.count = resp.data;
      })
    },
    methods: {
        changeToken:function() {
            this.able = !this.able;
        },
        changeTokenConfirm:function() {
            const param = new URLSearchParams();
            param.append('token',this.newToken);

            axios.post(data.url+'/user/updateToken',param);
            this.able = !this.able;
        },
        goBack:function() {
            this.$router.push('/index');
        },
        pushBlog:function() {
            this.$router.push('/write');
        }
    }
}
</script>

<style scoped>
    .tbody{
        text-align: center;
        margin: 30px auto auto;
    }
</style>