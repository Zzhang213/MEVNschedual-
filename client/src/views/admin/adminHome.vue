<template>
    <div class="page-container">
        <h1>Admin Page</h1>
        <div class="button-container">
            <button @click="handleAddTeam">Add Team</button>
            <button @click="handleAddLeague">Add League</button>
            <button @click="handleAddEvent">Add Event</button>
        </div>

    </div>
    <eventsTable></eventsTable>
</template>

<script setup>
import { useRouter } from 'vue-router';
import eventsTable from '../../components/eventsTable.vue'

const router = useRouter();

const handleAddTeam = () => {
    // Navigate to the "Add Team" page or perform the associated action
    router.push('/admin/addTeam');
};

const handleAddLeague = () => {
    // Navigate to the "Add League" page or perform the associated action
    router.push('/admin/addLeague');
};

const handleAddEvent = () => {
    // Navigate to the "Add Event" page or perform the associated action
    router.push('/admin/addEvent');
};
</script>

<style scoped>
.page-container {
    max-width: 600px;
    margin: auto;
    padding: 20px;
}

.button-container {
    display: flex;
    gap: 10px;
}

button {
    padding: 10px 20px;
    border-radius: 5px;
    background-color: #007bff;
    color: #fff;
    border: none;
    cursor: pointer;
}
</style>