<script setup lang="ts">
import { api } from '@/models/myFetch';
import { getOne, type ProductReview, type Product } from '@/models/products';
import { refSession } from '@/models/session';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';

dayjs.extend(relativeTime);

const route = useRoute('/products/[id]')
const product = ref<Product>();

const newReview = ref<Partial<ProductReview>>({
    rating: 0,
    comment: '',
})

const session = refSession();

getOne(route.params.id)
    .then((response) => {
        product.value = response;
    })

const avg_rating = computed(() =>
    (product.value?.reviews?.reduce((acc, review) => acc + (review?.rating ?? 0), 0) ?? 0)
    / (product.value?.reviews?.length ?? 1)
);

async function SubmitReview() {
    if (!session.value.user) {
        return;
    }
    const review = {
        ...newReview.value,
        product_id: product.value?.id,
        reviewer_id: session.value.user.id,
        reviewer: session.value.user,
        date: new Date().toLocaleDateString(),
    } as ProductReview;

    //const response = await api('reviews', review)

    product.value?.reviews?.push(review)

    newReview.value = {
        rating: 0,
        comment: '',
    }
}

</script>

<template>
    <div>

        <div class="product section" v-if="product">
            <div class="product-images">
                <img v-for="i in product.images" :src="i" alt="product image" />
            </div>
            <div class="product-info">
                <b-rate v-model="avg_rating" disabled show-score size="is-large"></b-rate>
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
                                <strong>{{ review.reviewer?.firstName }} {{ review.reviewer?.lastName }}</strong> -

                                <b-rate v-model="review.rating" disabled show-score></b-rate>

                                <p>{{ review.comment }}</p>
                                <i>
                                    {{ dayjs(review.date).fromNow() }}
                                </i>
                            </div>

                        </li>
                    </ul>
                    <form class="card" v-if="session.user" @submit.prevent="SubmitReview">
                        <div class="card-content">
                            <img :src="session.user?.image" alt="reviewer avatar"
                                 class="avatar" />
                            <strong>{{ session.user?.firstName }} {{ session.user?.lastName }}</strong>

                            <b-rate v-model="newReview.rating" show-score></b-rate>
                            <textarea v-model="newReview.comment" class="textarea"
                                      placeholder="Leave a review"></textarea>
                            <button class="button is-success">Submit</button>
                        </div>
                    </form>
                    <div v-else>
                        <p>You need to be logged in to leave a review</p>

                    </div>

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

.rate {
    float: right;
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