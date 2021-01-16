<template>
    <button @click="doSth();">点击登录</button>
</template>

<script>
export default {
    name: "login",
    methods: {
        doSth:function() {
            this.$router.push("/index");
        }
    }
}
</script>

<style scoped>

</style>