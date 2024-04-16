<template>
  <div v-if="!success" class="signin-container">
    <h2>Sign In</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="username">Username</label>
        <input type="text" id="username" v-model="username" required />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit">Sign In</button>
      <p v-if="error" class="error-message">{{ error }}</p>
    </form>
  </div>
  <div v-if="success" class="signin-container">
    <p class="success-message">User signed in successfully.</p>
    <router-link to="/profile">Go to Profile</router-link>
  </div>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue';
import apiClient from '../services/apiClient';
import { useAuthStore } from '@/stores/auth';
import AdminHome from './admin/adminHome.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const authStore = useAuthStore();

onBeforeMount(() => {
  if (authStore.isAuthenticated) {
    router.push('/admin')
  }
})

const error = ref('');
const success = ref(false);
const username = ref('');
const password = ref('');

const handleSubmit = async () => {
  error.value = '';

  try {
    const response = await apiClient.post('/auth/login', {
      username: username.value,
      password: password.value,
    });

    console.log('Sign In successful:', response.data);
    success.value = true;


    // Save the authentication token in localStorage
    //localStorage.setItem('authToken', response.data.token);
    await authStore.login(response.data.token)


    router.push('/admin')


    // Reset form fields or redirect user after successful sign-in
  } catch (e) {
    console.error('Error signing in:', e);
    error.value = e.response.data.message || 'An error occurred during sign in.';
  }
};
</script>

<style scoped>
.signin-container {
  max-width: 400px;
  margin: auto;
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input[type='text'],
input[type='password'] {
  width: 95%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

.error-message {
  color: red;
  margin-top: 10px;
}

.success-message {
  color: green;
  margin-top: 10px;
}

a {
  text-decoration: none;
}
</style>
