<script setup lang="ts">
import { refCart } from '@/models/cart';

const cart = refCart(); 
</script>

<template>
    <div class="cart">
        <h2 class="title is-4">
            Shopping Cart ({{ cart.length }})
        </h2>
        <ul>
            <li v-for="item in cart" :key="item.product.id">
                <img :src="item.product.thumbnail" :alt="item.product.title" />
                <span>
                    {{ item.product.title }}
                </span>
                <span>
                    <select v-model="item.quantity">
                        <option v-for="n in 10" :key="n" :value="n">
                            {{ n }}
                        </option>
                    </select>
                </span>
                <span>
                    x ${{ item.product.price }}
                </span>
                <span>
                    = ${{ item.product.price * item.quantity }}
                </span>
            </li>
        </ul>
        <h2 class="title is-4">
            Total: ${{cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0)}}
        </h2>
    </div>
</template>

<style scoped>
.cart {
    margin: 1rem;
}

li {
    display: flex;
    justify-content: space-between;
    align-items: center;

    img {
        width: 50px;
        height: 50px;
    }
}
</style>