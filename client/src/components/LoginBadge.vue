<script setup lang="ts">

import { googleLogin, isLoggedIn, login, logout, refSession } from '@/models/session';
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

        <a class="button is-light" @click.prevent="googleLogin">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1024px-Google_%22G%22_logo.svg.png"
                 alt="Google logo" width="16" height="16" />
            Log in using Google
        </a>
    </div>
    <div class="profile" v-else>
        <img
             :src="session?.user?.image"
             alt="user avatar" />
        <div>
            {{ session?.user?.firstName }} {{ session?.user?.lastName }}
            (<a @click="logout()">Log out</a>) <br />
            <i>{{ session?.user?.email }}</i>
        </div>

    </div>
</template>

<style scoped>
.navbar-dropdown {
    max-height: calc(100vh - 3.5rem);
    overflow-y: auto;
}

.profile {
    display: flex;
    align-items: center;
    gap: .5em;
    font-size: small;
}
</style>