<script setup lang="ts">
import { getProducts } from '@/models/products';


const products = getProducts();
</script>

<template>
    <div>
        <h1 class="title">Products</h1>
        <ul class="box">
            <li v-for="product in products.items" :key="product.id">
                <router-link :to="`/products/${product.id}`">
                    {{ product.title }} - ${{ product.price }}
                </router-link>
            </li>
        </ul>
    </div>
</template>

<style scoped></style>