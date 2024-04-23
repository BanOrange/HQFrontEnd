<!-- Course.vue -->
<template>
  <div>
    <h2>{{ course.name }}</h2>
    <p>{{ course.teacher }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';

let course = ref({
  name: 'Course Name',
  teacher: 'Teacher Name'
});
</script>