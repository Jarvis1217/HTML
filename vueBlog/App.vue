<template>
    <nav-top></nav-top>
    <router-view/>
</template>

<script>
import NavTop from "@/components/navTop";

export default {
    name: "indexPage",
    components: {
        NavTop
    },
}
</script>