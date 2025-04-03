<script setup lang="ts">

var bestClass = 'Web Programming'
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
  </main>
</template>
