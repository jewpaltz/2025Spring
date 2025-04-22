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
                <div class="product-info">
                    <h4 class="title is-6">
                        {{ item.product.title }}
                    </h4>
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
                </div>

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
    align-items: center;
    gap: 1em;

    padding: .2em;
    border-bottom: 1px solid #ccc;

    img {
        width: 50px;
        height: 50px;
    }
}

.title.is-6 {
    margin: 0 0 0.2em;
}
</style>