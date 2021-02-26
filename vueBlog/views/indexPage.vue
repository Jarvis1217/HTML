<template>
    <div class="body">
        <left-info></left-info>
        <main-list></main-list>
    </div>
</template>

<script>
import LeftInfo from "@/components/leftInfo";
import MainList from "@/components/mainList";

export default {
    name: "indexPage",
    components: {
        MainList,
        LeftInfo
    },
}
</script>


<style scoped>
    .body {
        width: 80%;
        margin: auto;
        padding-left: 18px;
        display: flex;
    }
</style>