<template>
    <div class="personal">
        <img src="../assets/images/jobs.jpg" width="200" height="200"> <br>
        <span style="font-size: larger;font-weight:bold;">Stay hungry,</span> <br>
        <span style="font-size: larger;font-weight:bold;">Stay foolish.</span>

        <div class="adv">
            <p>Advertising space for rent</p>
        </div>
    </div>
</template>

<script>
export default {
    name: "leftInfo"
}
</script>

<style scoped>
    .personal {
        background-color: black;
        width: 300px;
        text-align: center;
        color: white;
    }
    .adv {
        margin-top: 50px;
        height: 360px;
        padding-top: 180px;
        background-color: #b6b6b6;
        color: white;
    }
</style>