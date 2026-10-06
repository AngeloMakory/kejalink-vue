<script setup>
import { computed, reactive, ref } from 'vue'
import { AREAS, state, dayLabel, addPost, showToast } from '../store'
import ListingCard from '../components/ListingCard.vue'

// Post form (collapsed until the tenant wants to share a house)
const open = ref(false)
const blank = () => ({ title: '', area: 'Langata', rent: '', date: '', feat: '' })
const form = reactive(blank())

function submit() {
  if (!form.title.trim() || !form.rent || !form.date) return showToast('Add a title, rent and move-out date')
  addPost({
    title: form.title.trim(), area: form.area, rent: +form.rent, date: form.date,
    feat: form.feat.split(',').map(s => s.trim()).filter(Boolean),
  })
  Object.assign(form, blank())
  state.filter = '' // show the new post
  open.value = false
  showToast('Posted')
}

// Newest first, filtered by area + max rent, then grouped by day label
const groups = computed(() => {
  const max = Number(state.settings.max) || Infinity
  const list = state.posts
    .filter(p => (!state.filter || p.area === state.filter) && p.rent <= max)
    .sort((a, b) => b.t - a.t)
  const out = []
  for (const p of list) {
    const label = dayLabel(p.t)
    const last = out[out.length - 1]
    last && last.label === label ? last.items.push(p) : out.push({ label, items: [p] })
  }
  return out
})
</script>

<template>
  <section>
    <div class="hero">
      <h1>Moving out? Hand your house to the next tenant.</h1>
      <p>Tenants searching in your area see it here and reach out directly.</p>
    </div>

    <div class="panel">
      <button v-if="!open" class="btn" @click="open = true">Post your house</button>
      <form v-else @submit.prevent="submit">
        <h2>Post your house</h2>
        <div class="grid">
          <label>Title<input v-model="form.title" placeholder="Spacious 2BR near Langata Road"></label>
          <label>Area<select v-model="form.area"><option v-for="a in AREAS" :key="a">{{ a }}</option></select></label>
          <label>Rent (KES / month)<input v-model="form.rent" type="number" min="0" placeholder="25000"></label>
          <label>Move-out date<input v-model="form.date" type="date"></label>
          <label class="full">Features (comma separated)<input v-model="form.feat" placeholder="2 bedrooms, parking, water 24/7"></label>
          <div class="full actions">
            <button class="btn" type="submit">Post to timeline</button>
            <button class="btn ghost" type="button" @click="open = false">Cancel</button>
          </div>
        </div>
      </form>
    </div>

    <div class="filter">
      <h2>Houses opening up</h2>
      <select v-model="state.filter" aria-label="Filter by area">
        <option value="">All areas</option>
        <option v-for="a in AREAS" :key="a">{{ a }}</option>
      </select>
    </div>
    <div v-if="!groups.length" class="empty">No houses here yet. Try another area or raise your max rent in Settings.</div>
    <ul v-else class="feed">
      <template v-for="g in groups" :key="g.label">
        <li class="day">{{ g.label }}</li>
        <ListingCard v-for="p in g.items" :key="p.id" :post="p" :own="!!p.mine" />
      </template>
    </ul>
  </section>
</template>
