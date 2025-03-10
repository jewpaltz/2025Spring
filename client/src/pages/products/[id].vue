<script setup lang="ts">
import { getProductById, type Product } from '@/models/products';
import { useRoute } from 'vue-router';


const route = useRoute('/products/[id]');

const product = getProductById(+route.params.id);

function addToCart(product: Product) {
    console.log('Add to cart', product);
}
</script>

<template>
    <div v-if="product">
        <h1 class="title">
            {{ product.title }} - ${{ product.price }}
        </h1>
        <p>{{ product.description }}</p>
        <p>
            <button @click="addToCart(product)">Add to Cart</button>
        </p>
    </div>
    <div v-else>
        <h1 class="title">Product not found</h1>
    </div>
</template>

<style scoped></style>