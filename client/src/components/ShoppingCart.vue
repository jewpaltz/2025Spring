<script setup lang="ts">
import { refCart } from '@/models/cart';

const cart = refCart(); 
</script>

<template>
    <div class="cart">
        <h2 class="title is-4">
            Shopping Cart
        </h2>
        <ul>
            <li v-for="item in cart" :key="item.id">
                {{ item.name }} - {{ item.price }}
            </li>
        </ul>
    </div>
</template>

<style scoped>
.cart {
    margin: 1rem;
}
</style>