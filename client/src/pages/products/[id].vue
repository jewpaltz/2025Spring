<script setup lang="ts">
import { getOne, type Product } from '@/models/products';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute('/products/[id]')
const product = ref<Product>();

getOne(route.params.id)
    .then((response) => {
        product.value = response;
    })

</script>

<template>
    <div>

        <div class="product section" v-if="product">
            <div class="product-images">
                <img v-for="i in product.images" :src="i" alt="product image" />
            </div>
            <div class="product-info">
                <h1 class="title">
                    {{ product.title }}
                </h1>
                <h2 class="subtitle">
                    {{ product.category }} - {{ product.brand }} - {{ product.tags?.join(' / ') }}
                </h2>

                <p>{{ product.description }}</p>
                <span class="price">${{ product.price }}</span>
                <button class="button is-success">Add to cart</button>

                <div>
                    Reviews:
                    <ul>
                        <li class="card" v-for="review in product.reviews" :key="review.id">
                            <div class="card-content">
                                <img :src="review.reviewer?.image" alt="reviewer avatar"
                                     class="avatar" />
                                <strong>{{ review.reviewer?.firstName }} {{ review.reviewer?.lastName }}</strong> - {{
                                    review.rating }} stars
                                <p>{{ review.comment }}</p>
                                <i>
                                    {{ review.date }}
                                </i>
                            </div>

                        </li>
                    </ul>
                </div>
            </div>

        </div>

        <div v-else class="section">
            <h1 class="title">Loading...</h1>
        </div>

    </div>
</template>

<style scoped>
.card {
    border: 1px solid #ccc;
    margin-bottom: .5em;
    ;
}

.avatar {
    width: 50px;
    height: 50px;
    border-radius: 5%;
    margin-right: 1em;
    float: left;
}

.product {
    display: flex;
}

.product-images {
    display: flex;
    flex-basis: 50%;
    flex-direction: column;
    justify-content: space-between;
}

.price {
    font-size: 1.5rem;
    font-weight: bold;
    color: palevioletred;
    display: block;
    margin: 1em;
}
</style>