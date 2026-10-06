<script setup>
import { ref } from 'vue'
import { state } from './store'
import Timeline from './views/Timeline.vue'
import Settings from './views/Settings.vue'
import Profile from './views/Profile.vue'

const views = { timeline: Timeline, settings: Settings, profile: Profile }
const tabs = [['timeline', 'Timeline'], ['settings', 'Settings'], ['profile', 'Profile']]
const view = ref('timeline') // default page
const go = v => { view.value = v; window.scrollTo(0, 0) }
</script>

<template>
  <nav aria-label="Main">
    <button class="logo" aria-label="Hamahama timeline" @click="go('timeline')"><i></i>Hamahama</button>
    <button v-for="[id, label] in tabs" :key="id" class="tab"
            :aria-current="view === id ? 'page' : undefined" @click="go(id)">{{ label }}</button>
  </nav>

  <main><component :is="views[view]" /></main>

  <footer>
    <div class="foot-inner">
      <button class="logo small" aria-label="Hamahama timeline" @click="go('timeline')"><i></i>Hamahama</button>
      <div class="foot-links" role="navigation" aria-label="Footer">
        <button v-for="[id, label] in tabs" :key="id" class="tab"
                :aria-current="view === id ? 'page' : undefined" @click="go(id)">{{ label }}</button>
      </div>
      <small>&copy; 2026 Hamahama. Made in Nairobi.</small>
    </div>
  </footer>

  <div v-if="state.toast" class="toast" role="status">{{ state.toast }}</div>
</template>
