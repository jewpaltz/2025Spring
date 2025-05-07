<script setup lang="ts">
import { googleFetch, refSession } from '@/models/session';
import { ref } from 'vue';


const photos = ref<any[]>([])
const session = refSession()

async function loadPhotos() {
  const response = await googleFetch<any>('https://photoslibrary.googleapis.com/v1/mediaItems')

  photos.value = response.mediaItems
  console.log({ response });
}

</script>

<template>
  <main>
    <h1 class="title" style="color: darkorchid;">Anonymous Feedback Form</h1>
    <h2 class="subtitle">Enter your feedback here...</h2>
    <form action="#" class="form" method="get">
      <textarea
                class="textarea"
                placeholder="Tell me about your favorite class">
      </textarea>
      <button class="button is-success" type="submit">Submit</button>
    </form>
    <section class="hero is-light is-secondary">
      <div class="hero-body">
        <button class="button is-primary" @click.prevent="loadPhotos" :disabled="!session?.token">
          Load Files
        </button>

        <div class="gallery">
          <div class="gallery-item" v-for="photo in photos" :key="photo.id">
            <img :src="photo.baseUrl" :alt="photo.title" />
          </div>
        </div>

      </div>
    </section>

  </main>
</template>

<style scoped>
.gallery {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.gallery-item {
  flex: 1 1 calc(33.333% - 1rem);
  box-sizing: border-box;
}

.gallery-item img {
  width: 100%;
  height: auto;
}
</style>
