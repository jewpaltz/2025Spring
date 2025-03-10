<script setup lang="ts">
import { refCart } from '@/viewModels/cart';

const { cart, totalPrice } = refCart(); 
</script>

<template>
    <div class="cart">

        <h2 class="title">
            Your Cart
            {{ cart.length }} items
            (${{ totalPrice }})
        </h2>
        <ul class="box">
            <li v-for="item in cart" :key="item.title">
                {{ item.title }} - ${{ item.price }} x {{ item.quantity }} = ${{ item.price * item.quantity }}
            </li>
        </ul>
    </div>
</template>

<style scoped>
.cart {
    margin: 1rem;
}
</style>