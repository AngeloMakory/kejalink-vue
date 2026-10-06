<script setup>
import { state, fmtKes, fmtDate, toggleInterest, removePost, showToast } from '../store'
defineProps({ post: { type: Object, required: true }, own: Boolean })
</script>

<template>
  <li class="post">
    <div class="who">
      <div class="av">{{ post.init }}</div>
      <div>{{ post.name }}<small>{{ post.area }} · moving out {{ fmtDate(post.date) }}</small></div>
    </div>
    <h3>{{ post.title }}</h3>
    <div class="rent">{{ fmtKes(post.rent) }} / month</div>
    <div class="tags"><span v-for="f in post.feat" :key="f">{{ f }}</span></div>
    <div class="meta">
      <button v-if="own" class="btn ghost" @click="removePost(post.id)">Remove post</button>
      <template v-else>
        <button class="btn" :class="{ on: state.interested.includes(post.id) }" @click="toggleInterest(post.id)">
          {{ state.interested.includes(post.id) ? 'Interest sent' : "I'm interested" }}
        </button>
        <button class="btn ghost" @click="showToast('Chat opens once the backend is connected')">
          Message {{ post.name.split(' ')[0] }}
        </button>
      </template>
    </div>
  </li>
</template>
