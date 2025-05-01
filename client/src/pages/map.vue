<script setup lang="ts">
import { loadScript } from '@/models/myFetch';
import { ref } from 'vue';

const GOOGL_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

const google_maps_url = `https://maps.googleapis.com/maps/api/js?key=${GOOGL_API_KEY}&callback=console.debug&libraries=maps,marker&v=beta`

loadScript(google_maps_url)
    .then(() => {
        console.debug('Google Maps API loaded')
    })
    .catch((error) => {
        console.error('Error loading Google Maps API', error)
    })

const locations = ref([
    {
        lat: 40.12150192260742,
        lng: -100.45039367675781,
        title: 'Main Store',
    },
    {
        lat: 41.12150192260742,
        lng: -101.45039367675781,
        title: 'Outlet',
    },
])
</script>

<template>
    <gmp-map center="40.12150192260742,-100.45039367675781" zoom="4" map-id="DEMO_MAP_ID">
        <gmp-advanced-marker v-for="location in locations" :position="`${location.lat},${location.lng}`"
                             :title="location.title"></gmp-advanced-marker>
    </gmp-map>

</template>

<style scoped>
gmp-map {
    width: 100%;
    height: calc(100vh - 100px);
}
</style>