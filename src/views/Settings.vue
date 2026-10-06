<script setup>
import { reactive } from 'vue'
import { AREAS, state, applyTheme, showToast } from '../store'
const draft = reactive({ ...state.settings })

function save() {
  Object.assign(state.settings, draft)
  state.filter = draft.area
  applyTheme()
  showToast('Changes saved')
}
</script>

<template>
  <section class="panel">
    <h2>Settings</h2>
    <div class="row"><div>Looking in<small>Show this area first on your timeline</small></div>
      <select v-model="draft.area" class="inline"><option v-for="a in AREAS" :key="a">{{ a }}</option></select></div>
    <div class="row"><div>Max rent (KES)<small>Hide houses above this amount</small></div>
      <input v-model="draft.max" type="number" min="0" placeholder="No limit" class="inline" style="width:130px"></div>
    <div class="row"><div>Notify me of new houses<small>When one is posted in your area</small></div>
      <input v-model="draft.notify" type="checkbox" class="inline" style="width:auto"></div>
    <div class="row"><div>Theme</div>
      <select v-model="draft.theme" class="inline">
        <option value="auto">Match device</option><option value="light">Light</option><option value="dark">Dark</option>
      </select></div>
    <div style="margin-top:14px"><button class="btn" @click="save">Save changes</button></div>
  </section>
</template>
