<template>
  <nav class="navbar">
    <div class="navbar-brand" @click="router.push('/')">My App</div>
    <div class="navbar-links">
      <router-link to="/login" v-if="!isLoggedIn && !isLoginRoute">Admin Sign In</router-link>
      <button @click="handleLogout" v-if="isLoggedIn">Logout</button>
    </div>
  </nav>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';


const authStore = useAuthStore();



const {isLoggedIn} = storeToRefs(authStore);
const isRegisterRoute = ref(false);
const isLoginRoute = ref(false)
const route = useRoute();
const router = useRouter();

const checkCurrentRoute = () => {

  if (!isLoggedIn) {
    isRegisterRoute.value = route.path === '/register';
    isLoginRoute.value = route.path === '/login'
  }
  // Add more route checks if needed
};

const handleLogout = () => {
  // Implement your logout logic here
  authStore.logout()
};

onMounted(checkCurrentRoute);
watch(route, checkCurrentRoute);
watch(isLoggedIn, checkCurrentRoute);
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #333;
  color: #fff;
}

.navbar-brand {
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
}

.navbar-links {
  display: flex;
  gap: 10px;
}

.navbar-links a {
  text-decoration: none;
  color: white;
}

.navbar-links button {
  background-color: #f44336;
  color: #fff;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
}

/* Media query for responsiveness */
@media (max-width: 768px) {
  .navbar-links {
    flex-direction: column;
    gap: 10px;
  }

  .navbar-links button {
    width: 100%;
  }
}
</style>
