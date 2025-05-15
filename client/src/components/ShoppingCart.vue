<script setup lang="ts">
import { refCart } from '@/models/cart';
import { ref } from 'vue';

const cart = refCart();
const newItemId = ref('');
const showAddItem = ref(false);
const options = ref([
    { label: 'Apples', value: '1' },
    { label: 'Bananas', value: '2' },
    { label: 'Cherries', value: '3' },
    { label: 'Dates', value: '4' },
    { label: 'Eggplants', value: '5' },
    { label: 'Figs', value: '6' },
    { label: 'Grapes', value: '7' },
    { label: 'Honeydew', value: '8' },
    { label: 'Kiwi', value: '9' },
    { label: 'Lemons', value: '10' }
]);

</script>

<template>
    <div class="cart">
        <h2 class="title is-4">
            <button style="float: right;" class="button is-primary" @click="showAddItem = !showAddItem">
                <span class="icon ">
                    <i class="fas fa-plus"></i>
                </span>
            </button>
            Shopping Cart ({{ cart.length }})
        </h2>
        <div>

            <div class="message is-link" v-show="showAddItem">
                <div class="message-body">
                    <form @submit.prevent="() => showAddItem = false">
                        <div class="field">
                            <div class="control">
                                <o-autocomplete
                                                v-model="newItemId"
                                                :options="options"
                                                option-value="id"
                                                option-label="title"
                                                option-thumbnail="thumbnail"
                                                expanded
                                                placeholder="Select a product"
                                                icon="search"
                                                clearable
                                                open-on-focus>
                                </o-autocomplete>
                            </div>
                        </div>
                        <button type="submit" class="button is-primary">Add to Cart</button>

                    </form>
                </div>
            </div>
        </div>
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