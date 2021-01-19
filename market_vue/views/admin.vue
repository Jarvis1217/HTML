<template>
    <div id="adminInfo">
        <div class="operation">
            <form class="form-inline">
                <div class="form-group">
                    <input type="text" v-model="proName" class="form-control" placeholder="商品名" />
                </div>
                <div class="form-group">
                    <input type="text" v-model="proPrice" class="form-control" placeholder="单价" />
                </div>
                <div class="form-group">
                    <input type="text" v-model="proStock" class="form-control" placeholder="库存" />
                </div>
                <div class="form-group">
                    <button @click="addProduct();" class="btn btn-info">添加商品</button>
                </div>
            </form>

            <form class="form-inline" style="margin-top: 20px">
                <div class="form-group">
                    <input type="text" v-model="changeProName" disabled="disabled" class="form-control" placeholder="商品名" />
                </div>
                <div class="form-group">
                    <input type="text" v-model="changeProPrice" class="form-control" placeholder="单价" />
                </div>
                <div class="form-group">
                    <input type="text" v-model="changeProStock" class="form-control" placeholder="库存" />
                </div>
                <div class="form-group">
                    <button @click="updateProduct();" class="btn btn-info">确认修改</button>
                </div>
            </form>
        </div>

        <table class="tb table table-bordered">
            <th style="text-align: center;">商品名</th>
            <th style="text-align: center;">商品单价</th>
            <th style="text-align: center;">库存余量</th>
            <th style="text-align: center;">操作</th>

            <tr v-for="(pro,index) of products" :key="index">
                <td>{{ pro.product }}</td>
                <td>{{ pro.price }}</td>
                <td>{{ pro.stock }}</td>
                <td>
                    <button @click="delProduct(index);" class="btn btn-primary btn-sm btn btn-danger">删除</button>
                    <button @click="getProduct(index);" class="btn btn-primary btn-sm">修改</button>
                </td>
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
    name: "admin.vue",
    data() {
        return {
            proName: "",
            proPrice: "",
            proStock: "",
            changeProName: "",
            changeProPrice: "",
            changeProStock: "",
            products: [],
            cacheIndex: ""
        }
    },
    mounted() {
        const _this = this;
        axios.get("http://192.168.3.222:8088/sk/goods").then(function (resp) {
            $.each(resp.data, function (index, value) {
                _this.products.push(value);
            });
        });
    },
    methods: {
        addProduct: function () {
            if (this.proPrice.trim() === "" || this.proName.trim() === "" || this.proStock.trim() === "") {
                alert("请输入完整商品信息");
            } else {
                const params = new URLSearchParams();
                params.append("price", this.proPrice);
                params.append("product", this.proName);
                params.append("stock", this.proStock);

                axios.post("http://192.168.3.222:8088/sk/add", params);
                this.products.push({
                    "price": this.proPrice,
                    "product": this.proName,
                    "stock": this.proStock
                })
                console.log(this.products);
            }
        },
        delProduct: function (index) {
            const params = new URLSearchParams();
            params.append("text", this.products[index].product);

            axios.post("http://192.168.3.222:8088/sk/delete", params);
            this.products.splice(index, 1);
        },
        getProduct: function (index) {
            this.changeProName = this.products[index].product;
            this.changeProPrice = this.products[index].price;
            this.changeProStock = this.products[index].stock;
            this.cacheIndex = index;
        },
        updateProduct: function () {
            const params = new URLSearchParams();
            params.append("proName", this.changeProName);
            params.append("proPrice", this.changeProPrice);
            params.append("proStock", this.changeProStock);

            axios.post("http://192.168.3.222:8088/sk/update", params);

            const index = this.cacheIndex;
            this.products[index].product = this.changeProName;
            this.products[index].price = this.changeProPrice;
            this.products[index].stock = this.changeProStock;
        }
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
    #adminInfo {
        width: 1000px;
        display: block;
        position: relative;
        top: 50%;
        margin: 80px auto auto;
    }
    .tb {
        text-align: center;
        margin: 30px auto auto;
        color: white;
        width: 600px;
    }
    .operation {
        text-align: center;
        width: 800px;
        margin: auto;
        padding-left: 58px;
    }
</style>