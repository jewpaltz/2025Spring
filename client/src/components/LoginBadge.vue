<script setup lang="ts">

import { get, getAll, type User } from '@/models/users';
import { ref } from 'vue'
const users = ref<User[]>([])

getAll().then((response) => {
    users.value = response.items
})

</script>

<template>
    <div class="buttons">
        <a class="button is-primary">
            <strong>Sign up</strong>
        </a>

        <div class="navbar-item has-dropdown is-hoverable">
            <a class="button is-light">
                Log in
            </a>

            <div class="navbar-dropdown">
                <a class="navbar-item" v-for="user in users" :key="user.id">
                    {{ user.firstName }} {{ user.lastName }}
                </a>
            </div>
        </div>
    </div>
</template>

<style scoped></style>