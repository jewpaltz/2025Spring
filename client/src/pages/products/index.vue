<script setup lang="ts">
import { getAll, type Product } from '@/models/products';

const products = getAll()

function addToCart(product: Product) {
    console.log('Add to cart', product)
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
                    <button class="button is-success" @click="addToCart(p)">Add to cart</button>
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