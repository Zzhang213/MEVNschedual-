<template>
    <div>
        <table v-if="teams.length" class="team-table">
            <thead>
                <tr>
                    <th>Team Name</th>
                    <th>Description</th>
                    <th>Action</th> <!-- New column for actions -->
                </tr>
            </thead>
            <tbody>
                <tr v-for="team in teams" :key="team._id">
                    <td>{{ team.teamName }}</td>
                    <td>{{ team.description }}</td>
                    <td>
                        <button @click="deleteTeam(team._id)">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <p v-else>No teams added yet.</p>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import apiClient from '@/services/apiClient';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();

const teams = ref([]); // Array to hold the teams data

const fetchTeams = async () => {
    try {
        const response = await apiClient.get('/teams', {
            headers: { Authorization: `Bearer ${authStore.authToken}` },
        });
        teams.value = response.data; // Update teams array with fetched data
    } catch (error) {
        console.error('Error fetching teams:', error);
    }
};

const deleteTeam = async (teamId) => {
    try {
        await apiClient.delete(`/teams/${teamId}`, {
            headers: { Authorization: `Bearer ${authStore.authToken}` },
        });
        // Remove the deleted team from the teams array
        teams.value = teams.value.filter((team) => team._id !== teamId);
    } catch (error) {
        console.error('Error deleting team:', error);
    }
};

onMounted(fetchTeams); // Fetch teams data when the component is mounted

</script>

<style scoped>
.team-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
}

.team-table th,
.team-table td {
    border: 1px solid #ccc;
    padding: 8px;
}

.team-table th {
    background-color: #f2f2f2;
}

/* Other styles as needed */
</style>