import { reactive } from 'vue'

export const AREAS = ['Langata', 'Kilimani', 'Kileleshwa', 'South B', 'Kasarani', 'Ruaka', 'Donholm']
export const ME = { name: 'Pinky Achieng', init: 'P' }

const now = Date.now(), H = 36e5

export const state = reactive({
  filter: 'Langata',
  toast: '',
  interested: [],
  settings: { area: 'Langata', max: '', notify: true, theme: 'auto' },
  posts: [
    { id: 1, name: 'Lucy Wambui', init: 'L', area: 'Langata', title: 'Bright 1BR, Langata Road', rent: 18000, date: '2026-11-15', feat: ['1 bedroom', 'Own compound', 'Water 24/7'], t: now - 2 * H },
    { id: 2, name: 'Brian Otieno', init: 'B', area: 'Kilimani', title: '2BR with balcony', rent: 42000, date: '2026-12-01', feat: ['2 bedrooms', 'Balcony', 'Gym', 'Parking'], t: now - 27 * H },
    { id: 3, name: 'Pinky Achieng', init: 'P', area: 'Langata', title: 'Spacious 2BR near Southern Bypass', rent: 26000, date: '2026-11-30', feat: ['2 bedrooms', 'Parking', 'Fibre ready', 'Gated'], t: now - 30 * H, mine: true },
    { id: 4, name: 'Faith Mutua', init: 'F', area: 'South B', title: 'Bedsitter, quiet block', rent: 9500, date: '2026-11-10', feat: ['Bedsitter', 'Tiled', 'Shared laundry'], t: now - 75 * H },
  ],
})

export const fmtKes = n => 'KES ' + Number(n).toLocaleString('en-KE')
export const fmtDate = d => new Date(d).toLocaleDateString('en-KE', { day: 'numeric', month: 'short' })
export const dayLabel = t => {
  const d = Math.floor((Date.now() - t) / (24 * H))
  return d < 1 ? 'Today' : d === 1 ? 'Yesterday' : `${d} days ago`
}

let timer
export function showToast(msg) {
  state.toast = msg
  clearTimeout(timer)
  timer = setTimeout(() => (state.toast = ''), 2200)
}

export function addPost(p) {
  state.posts.push({ id: Date.now(), name: ME.name, init: ME.init, t: Date.now(), mine: true, ...p })
}
export function removePost(id) {
  state.posts = state.posts.filter(p => p.id !== id)
  showToast('Post removed')
}
export function toggleInterest(id) {
  const i = state.interested.indexOf(id)
  i === -1 ? state.interested.push(id) : state.interested.splice(i, 1)
  showToast(i === -1 ? 'Interest sent' : 'Interest withdrawn')
}
export function applyTheme() {
  const el = document.documentElement
  state.settings.theme === 'auto' ? el.removeAttribute('data-theme') : el.setAttribute('data-theme', state.settings.theme)
}
