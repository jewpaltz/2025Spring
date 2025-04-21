<script setup lang="ts">

import { isLoggedIn, login, logout, refSession } from '@/models/session';
import { get, getAll, type User } from '@/models/users';
import { ref } from 'vue'
const users = ref<User[]>([])

getAll().then((response) => {
    users.value = response.items
})

const session = refSession()

</script>

<template>
    <div class="buttons" v-if="!isLoggedIn()">
        <a class="button is-primary">
            <strong>Sign up</strong>
        </a>

        <div class="navbar-item has-dropdown is-hoverable">
            <a class="button is-light">
                Log in
            </a>

            <div class="navbar-dropdown">
                <a class="navbar-item" v-for="user in users" :key="user.id" @click="login(user.id)">
                    {{ user.firstName }} {{ user.lastName }}
                </a>
            </div>
        </div>
    </div>
    <div class="buttons" v-else>
        <a class="button is-light" @click="logout()">
            Log out
        </a>
        Hello
        {{ session?.user?.firstName }} {{ session?.user?.lastName }}

    </div>
</template>

<style scoped></style>