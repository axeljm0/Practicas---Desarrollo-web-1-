<template>
  <main class="app-main">
    <MultiStepForm />
  </main>
</template>

<script>
import MultiStepForm from './components/MultiStepForm.vue'

export default {
  name: 'App',
  components: {
    MultiStepForm
  }
}
</script>

<style>
/* Global Resets & Aesthetics */
*, *::before, *::after {
  box-sizing: border-box;
}

html, body {
  margin: 0;
  padding: 0;
  background-color: #faf7f2;
  font-family: 'Plus Jakarta Sans', 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  color: #1e293b;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.app-main {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 40px 16px;
  background-color: #faf7f2;
}

#app {
  width: 100%;
}
</style>

