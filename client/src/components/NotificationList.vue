<script setup lang="ts">
import { refNotifications, removeNotification } from '@/models/notifications';
import { ref } from 'vue';

const notifications = refNotifications()


</script>

<template>
    <div>
        <div v-for="(message, index) in notifications" :key="index" class="notification is-light"
             :class="`is-${message.type}`">
            <button class="delete" @click="removeNotification(index)"></button>
            {{ message.message }}
        </div>
    </div>
</template>

<style scoped></style>