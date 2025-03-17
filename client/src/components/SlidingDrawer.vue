<script setup lang="ts">

const props = defineProps<{
    isOpen?: boolean
}>()
</script>

<template>
    <div class="sliding-drawer" :class="{ open: props.isOpen }">
        <slot></slot>
    </div>
</template>

<style scoped>
.sliding-drawer {
    position: fixed;
    top: 50px;
    bottom: 0;
    right: 0;
    width: 30rem;
    background-color: white;
    box-shadow: -1px 0 7px rgba(0, 0, 0, 0.5);
    transform: translateX(95%);
    transition: transform 0.3s ease-out;
}

.sliding-drawer.open,
.sliding-drawer:hover {
    transform: translateX(0);
}
</style>