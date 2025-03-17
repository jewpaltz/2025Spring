<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
import NotificationList from './components/NotificationList.vue';
import SlidingDrawer from './components/SlidingDrawer.vue';
import ShoppingCart from './components/ShoppingCart.vue';
import { ref } from 'vue';

const isShoppingCartOpen = ref(false)

</script>

<template>
  <header>
    <NavBar v-model:is-shopping-cart-open="isShoppingCartOpen" />
  </header>

  <div class="container body-container">
    <NotificationList />
    <RouterView />
  </div>

  <SlidingDrawer :isOpen="isShoppingCartOpen">
    <ShoppingCart />
  </SlidingDrawer>
</template>

<style>
body {
  background-color: aliceblue;
}

.body-container {
  background-color: white;
  height: 100vh;
  padding: 1rem;
  padding-top: 4em;
}
</style>
