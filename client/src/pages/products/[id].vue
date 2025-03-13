<script setup lang="ts">
import { getOne } from '@/models/products';
import { useRoute } from 'vue-router';

const route = useRoute('/products/[id]')
const product = getOne(route.params.id)
</script>

<template>
    <div>

        <div class="product section">
            <div class="product-images">
                <img v-for="i in product.images" :src="i" alt="product image" />
            </div>
            <div class="product-info">
                <h1 class="title">
                    {{ product.title }}
                </h1>
                <p>{{ product.description }}</p>
                <span class="price">${{ product.price }}</span>
                <button class="button is-success">Add to cart</button>
            </div>

        </div>
    </div>
</template>

<style scoped>
.product {
    display: flex;
}

.product-images {
    display: flex;
    flex-basis: 50%;
    flex-direction: column;
    justify-content: space-between;
}

.price {
    font-size: 1.5rem;
    font-weight: bold;
    color: palevioletred;
    display: block;
    margin: 1em;
}
</style>