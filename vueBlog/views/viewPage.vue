<template>
    <div class="title"><h2>{{ title }}</h2></div>
    <div class="content" v-html="content">
    </div>
</template>

<script>
import axios from 'axios'
import data from "@/data.json";

export default {
    name: "viewPage",
    data() {
        return {
            title: this.$route.query.title,
            content: ''
        }
    },
    mounted() {
        const param = new URLSearchParams();
        param.append('title',this.title)

        axios.post(data.url+"blog/queryBlogByName",param).then(resp => {
            this.content = resp.data.bContent;
        });
    }
}
</script>

<style scoped>
    .title {
        /*border: 1px red solid;*/
        text-align: center;
        width: 600px;
        margin: 10px auto auto;
    }
    .content {
        /*border: 1px red solid;*/
        width: 1000px;
        margin: 10px auto auto;
    }
</style>