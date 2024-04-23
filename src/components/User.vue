<!-- User.vue -->
<template>
  <form @submit.prevent="handleSubmit">
    <input v-model="username" placeholder="Username" required>
    <input v-model="password" type="password" placeholder="Password" required>
    <button type="submit">Login</button>
  </form>
</template>

<script setup>
import { ref } from 'vue';

let username = ref('');
let password = ref('');

const handleSubmit = () => {
  // Validate the credentials and update the user's state
};
</script>