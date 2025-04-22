<script setup lang="ts">
import { addToCart } from '@/models/cart';
import { type DataListEnvelope } from '@/models/dataEnvelopes';
import { getAll, type Product } from '@/models/products';
import { ref } from 'vue';

const products = ref({} as DataListEnvelope<Product>)

getAll()
    .then((response) => {
        products.value = response
    })

function doAddToCart(product: Product) {
    addToCart(product)
}
</script>

<template>
    <div>
        <h1 class="title">Products</h1>
        <div class="shelf">
            <div class="product" v-for="p in products.items" :key="p.id">
                <div class="product-image">
                    <RouterLink :to="`/products/${p.id}`">
                        <img :src="p.thumbnail" alt="product image" />
                    </RouterLink>
                </div>
                <div class="product-info">
                    <h2>{{ p.title }}</h2>
                    <p>{{ p.description }}</p>
                    <span class="price">${{ p.price }}</span>
                    <button class="button is-success" @click="doAddToCart(p)">Add to cart</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.shelf {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

.shelf .product {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 30%;
    margin: 1em;
    padding: 1em;
    border: 1px solid #ccc;
    border-radius: 1em;
}

.price {
    color: crimson;
    font-weight: bold;
    font-size: 1.5em;
}

.button.is-success {
    float: right;
}
</style>