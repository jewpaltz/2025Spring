<script setup lang="ts">
import { refCart } from '@/models/cart';
import { ref } from 'vue'
import LoginBadge from './LoginBadge.vue';

const isActive = ref(false)

const cart = refCart()

const props = defineProps<{
    isShoppingCartOpen?: boolean
}>()

const event = defineEmits<{
    "update:isShoppingCartOpen": [boolean]
}>()

</script>

<template>
    <nav class="navbar is-info is-fixed-top" role="navigation" aria-label="main navigation">
        <div class="container">
            <div class="navbar-brand">
                <a class="navbar-item" href="https://jewpaltz.com">
                    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="30" />
                </a>

                <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false"
                   :class="{ 'is-active': isActive }" @click="isActive = !isActive">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>

            <div class="navbar-menu" :class="{ 'is-active': isActive }">
                <div class="navbar-start">


                    <RouterLink to="/" class="navbar-item">Home</RouterLink>
                    <RouterLink to="/products" class="navbar-item">Products</RouterLink>
                    <RouterLink to="/about" class="navbar-item">About</RouterLink>

                    <a class="navbar-item">
                        Documentation
                    </a>

                    <div class="navbar-item has-dropdown is-hoverable">
                        <a class="navbar-link">
                            More
                        </a>

                        <div class="navbar-dropdown">
                            <a class="navbar-item">
                                About
                            </a>
                            <a class="navbar-item is-selected">
                                Jobs
                            </a>
                            <a class="navbar-item">
                                Contact
                            </a>
                            <hr class="navbar-divider">
                            <a class="navbar-item">
                                Report an issue
                            </a>
                        </div>
                    </div>
                </div>

                <div class="navbar-end">
                    <div class="navbar-item">
                        <button class="button is-light" :class="{ 'is-active': props.isShoppingCartOpen }"
                                @click="event('update:isShoppingCartOpen', !props.isShoppingCartOpen)">
                            <span class="icon"> <i class="fas fa-shopping-cart"></i></span>

                        </button>
                        <span class="cart-length tag is-danger">{{ cart.length }}</span>
                    </div>
                    <div class="navbar-item">
                        <LoginBadge />
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<style scoped>
.cart-length {
    position: absolute;
    top: 0;
    right: 0;
    border-radius: 50%;
}
</style>