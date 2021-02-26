<template>
    <div style="text-align: center;margin-top: 15px">
        <input type="text" placeholder="请键入标题" v-model="title" style="width: 500px">
    </div>
    <div id="blog" style="width: 1200px;margin: 30px auto auto;"></div>
    <div style="text-align: center;margin-top: 15px">
        <button @click="pushBlog();" class="btn btn-primary">发布</button>
        <button @click="cancelPush();" class="btn btn-danger" style="margin-left: 15px">取消</button>
    </div>
</template>

<script>
import E from 'wangeditor'
import data from '../data.json'
import axios from 'axios'

export default {
    name: "writePage",
    data(){
        return{
            editor: '',
            title: ''
        }
    },
    mounted() {
       this.editor =  new E("#blog");
       this.editor.create();
    },
    methods: {
        pushBlog:function() {
            const r = confirm("确认发布？");
            if (r === true){
                const param = new URLSearchParams();
                param.append('title',this.title);
                param.append('content',this.editor.txt.html());

                axios.post(data.url+"blog/addBlog",param);

                setTimeout(()=>{
                    this.$router.push('/index');
                },200);

               // this.$router.push('/index');
            }
        },
        cancelPush:function() {
            const r = confirm("确认取消？");
            if (r === true){
                this.$router.push('/info');
            }
        }
    }
}
</script>

<style scoped>

</style>