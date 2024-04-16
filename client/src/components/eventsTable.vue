<template>
    <div class="event-list-container">
        <h1>Event List</h1>
        <table v-if="events.length" class="event-table">
            <thead>
                <tr>
                    <th>Event Type</th>
                    <th>Event Date</th>
                    <th>Event Time</th>
                    <th>Sports</th>
                    <th>Location</th>
                    <th>League Match</th>
                    <th>League</th>
                    <th>Team 1</th>
                    <th>Team 2</th>
                    <th>Action</th> <!-- New column for delete action -->
                </tr>
            </thead>
            <tbody>
                <tr v-for="event in events" :key="event._id">
                    <td>{{ event.eventType }}</td>
                    <td>{{ formatDate(event.eventDate) }}</td>
                    <td>{{ formatTime(event.eventTime) }}</td>
                    <td>{{ event.sports }}</td>
                    <td>{{ event.location }}</td>
                    <td>{{ event.isLeagueMatch ? 'Yes' : 'No' }}</td>
                    <td>{{ event.selectedLeague?.leagueName }}</td>
                    <td>{{ event.selectedTeam1?.teamName }}</td>
                    <td>{{ event.selectedTeam2?.teamName }}</td>
                    <td>
                        <button @click="deleteEvent(event._id)">Delete</button> <!-- Delete button -->
                    </td>
                </tr>
            </tbody>
        </table>
        <p v-else>No events available.</p>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import apiClient from '@/services/apiClient';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();

const events = ref([]);

const fetchEvents = async () => {
    try {
        const response = await apiClient.get('/events', {
            headers: { Authorization: `Bearer ${authStore.authToken}` },
        });
        events.value = response.data;
    } catch (error) {
        console.error('Error fetching events:', error);
    }
};

const deleteEvent = async (eventId) => {
    try {
        await apiClient.delete(`/events/${eventId}`, {
            headers: { Authorization: `Bearer ${authStore.authToken}` },
        });
        events.value = events.value.filter((event) => event._id !== eventId);
    } catch (error) {
        console.error('Error deleting event:', error);
    }
};

const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
};

const formatTime = (timeString) => {
    const options = { hour: '2-digit', minute: '2-digit', hour12: false };
    return new Date(`1970-01-01T${timeString}`).toLocaleTimeString(undefined, options);
};


onMounted(fetchEvents); // Fetch events data when the component is mounted
</script>

<style scoped>
.event-list-container {
    max-width: 1000px;
    margin: auto;
    padding: 20px;
}

.event-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
}

.event-table th,
.event-table td {
    border: 1px solid #ccc;
    padding: 8px;
}

.event-table th {
    background-color: #f2f2f2;
}
</style>