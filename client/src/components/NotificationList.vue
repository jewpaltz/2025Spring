<script setup lang="ts">
import { ref } from 'vue';

const notifications = ref([
    { text: 'This is a primary notification #1', type: 'success' },
    { text: 'This is a primary notification #2', type: 'warning' },
    { text: 'This is a primary notification #3', type: 'danger' },
    { text: 'This is a primary notification #4', type: 'info' },
]);

function removeNotification(index: number) {
    notifications.value.splice(index, 1);
};

</script>

<template>
    <div>
        <div v-for="(message, index) in notifications" :key="index" class="notification is-light"
             :class="`is-${message.type}`">
            <button class="delete" @click="removeNotification(index)"></button>
            {{ message.text }}
        </div>
    </div>
</template>

<style scoped></style>