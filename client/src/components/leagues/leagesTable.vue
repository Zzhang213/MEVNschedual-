<template>
    <div>
        <table v-if="leagues.length" class="league-table">
            <thead>
                <tr>
                    <th>League Name</th>
                    <th>Description</th>
                    <th>Action</th> <!-- New column for actions -->
                </tr>
            </thead>
            <tbody>
                <tr v-for="league in leagues" :key="league._id">
                    <td>{{ league.leagueName }}</td>
                    <td>{{ league.description }}</td>
                    <td>
                        <button @click="deleteLeague(league._id)">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <p v-else>No leagues added yet.</p>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import apiClient from '@/services/apiClient';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();

const leagues = ref([]); // Array to hold the leagues data

const fetchLeagues = async () => {
    try {
        const response = await apiClient.get('/leagues', {
            headers: { Authorization: `Bearer ${authStore.authToken}` },
        });
        leagues.value = response.data; // Update leagues array with fetched data
    } catch (error) {
        console.error('Error fetching leagues:', error);
    }
};

const deleteLeague = async (leagueId) => {
    try {
        await apiClient.delete(`/leagues/${leagueId}`, {
            headers: { Authorization: `Bearer ${authStore.authToken}` },
        });
        // Remove the deleted league from the leagues array
        leagues.value = leagues.value.filter((league) => league._id !== leagueId);
    } catch (error) {
        console.error('Error deleting league:', error);
    }
};

onMounted(fetchLeagues); // Fetch leagues data when the component is mounted

</script>

<style scoped>
.league-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
}

.league-table th,
.league-table td {
    border: 1px solid #ccc;
    padding: 8px;
}

.league-table th {
    background-color: #f2f2f2;
}

/* Other styles as needed */
</style>
