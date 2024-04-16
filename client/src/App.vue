<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import NavBar from './components/NavBar.vue'
</script>

<template>
  <NavBar></NavBar>
  <RouterView />
</template>

<style>
body {
  font-family: 'Roboto', sans-serif;
}




</style>
