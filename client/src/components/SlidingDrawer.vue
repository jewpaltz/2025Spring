<script setup lang="ts">

</script>

<template>
    <div class="sliding-drawer">
        <slot></slot>
    </div>
</template>

<style scoped>
.sliding-drawer {
    position: fixed;
    top: 50px;
    bottom: 0;
    right: 0;
    width: 20rem;
    background-color: white;
    box-shadow: -1px 0 7px rgba(0, 0, 0, 0.5);
    transform: translateX(18rem);
    transition: transform 0.3s ease-out;
}

.sliding-drawer.open,
.sliding-drawer:hover {
    transform: translateX(0);
}
</style>