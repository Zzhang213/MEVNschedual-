<template>
    <div class="add-team-container">
        <h1>Add Team</h1>
        <form @submit.prevent="handleSubmit">
            <div class="form-group">
                <label for="teamName">Team Name</label>
                <input type="text" id="teamName" v-model="teamName" required />
            </div>
            <div class="form-group">
                <label for="description">Description</label>
                <textarea id="description" v-model="description" required></textarea>
            </div>
            <button type="submit">Add Team</button>
            <button class="cancel-button" type="button" @click="handleCancel">Cancel</button>
            <p v-if="error" class="error-message">{{ error }}</p>
            <p v-if="success" class="success-message">Team added successfully!</p>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import apiClient from '@/services/apiClient';
import { useAuthStore } from '@/stores/auth';
import router from '@/router';


const authStore = useAuthStore();

const teamName = ref('');
const description = ref('');
const error = ref('');
const success = ref(false);



const handleSubmit = async () => {
    error.value = '';

    try {

        const response = await apiClient.post('/teams/',
            { teamName: teamName.value, description: description.value },
            { headers: { Authorization: `Bearer ${authStore.authToken}` } });


        console.log('Team added successfully:', response.data);
        success.value = true;


        setTimeout(() => {
            success.value = false;
        }, 3000);

        resetForm()

    } catch (error) {
        console.log('Error adding team:', error);
        error.value = 'Error adding team';
    }
};


const resetForm = () => {
    teamName.value = '';
    description.value = '';

};


const handleCancel = () => {
    // Navigate back to the previous page
    router.go(-1);
};

</script>

<style scoped>
.add-team-container {
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
textarea {
    width: 95%;
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

.cancel-button {
    background-color: #ff4d4f;
    margin-left: 20px;
}
</style>