<template>
    <div id="indexInfo">
        <table class="tb table table-bordered">
            <th style="text-align: center">商品名</th>
            <th style="text-align: center">商品单价</th>
            <th style="text-align: center">库存余量</th>

            <tr v-for="pro of products" :key="pro">
                <td>{{ pro.product }}</td>
                <td>{{ pro.price }}</td>
                <td>{{ pro.stock }}</td>
            </tr>
        </table>
    </div>
</template>

<script>
import axios from 'axios'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import $ from 'jquery'

export default {
    name: "index",
    data() {
        return {
            products:[]
        }
    },
    mounted(){
        const _this = this;
        axios.get("http://192.168.3.222:8088/sk/goods").then((resp) => {
            $.each(resp.data,function(index,value) {
                _this.products.push(value);
            });
        });
    }
}
</script>

<style>
html, body {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    background-color: #8000ff;
    color: white;
}
    #indexInfo {
        display: block;
        position: relative;
        top: 50%;
        margin-top: 150px;
    }
    .tb {
        margin: auto;
        text-align: center;
        width: 500px;
        color: white;
    }
</style>