<template>
  <div v-if="!success" class="register-container">
    <h2>Register</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="name">User Name</label>
        <input type="text" id="name" v-model="name" required />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" required @change=" " />
      </div>
      <div class="form-group">
        <label for="confirmPassword">Confirm Password</label>
        <input type="password" id="confirmPassword" v-model="confirmPassword" required />
      </div>
      <button type="submit">Register</button>
      <p v-if="error" class="error-message">{{ error }}</p>

    </form>
  </div>
  <div v-if="success" class="register-container">
    <p class="success-message">User registered successfully.</p>
    <router-link to="/register" v-if="!isLoggedIn && !isRegisterRoute">Login</router-link>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import apiClient from '../services/apiClient'

const error = ref('')
const success = ref(false);



const name = ref('umer');
const password = ref('sultan');
const confirmPassword = ref('sultan');

const handleSubmit = async () => {
  // Handle form submission, e.g., send data to backend or perform client-side validation
  error.value = ''
  if (password.value !== confirmPassword.value) {
    error.value = "Passwords don't match.";
    return; // Prevent form submission
  }


  try {

    let body = {
      username: name.value,
      password: password.value,
      confirmPassword: confirmPassword.value
    }



    const response = await apiClient.post('/auth/register', body);
    console.log('Registration successful:', response.data);

    success.value = true

    // Reset form fields or redirect user after successful registration
  } catch (e) {
    console.log('Error registering user:', e);
    error.value = e.response.data.message

    return
    // Handle error, display error message, etc.
  }



};
</script>

<style scoped>
.register-container {
  max-width: 400px;
  margin: auto;
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
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  background-color: #28a745;
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
../services/apiClient