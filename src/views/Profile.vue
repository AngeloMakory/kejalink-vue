<script setup>
import { computed } from 'vue'
import { state, ME } from '../store'
import ListingCard from '../components/ListingCard.vue'
const mine = computed(() => state.posts.filter(p => p.mine))
</script>

<template>
  <section>
    <div class="panel">
      <div class="who">
        <div class="av big">{{ ME.init }}</div>
        <div><h2 style="margin:0">{{ ME.name }}</h2><small>Langata · Moving out 30 Nov</small></div>
      </div>
      <p class="mute">Tenant for 3 years. Quiet block, good landlord, looking for a smaller place closer to town.</p>
    </div>
    <h2 style="margin-bottom:12px">My posts</h2>
    <ul v-if="mine.length" class="feed"><ListingCard v-for="p in mine" :key="p.id" :post="p" own /></ul>
    <div v-else class="empty">You have not posted a house. Go to the Timeline and post one.</div>
  </section>
</template>
