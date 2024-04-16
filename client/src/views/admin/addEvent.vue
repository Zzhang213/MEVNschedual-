<template>
    <div class="add-event-container">
        <h1>Add Event</h1>
        <form @submit.prevent="handleSubmit">
            <div class="form-group">
                <label for="eventType">Event Type</label>
                <input type="text" id="eventType" v-model="eventType" required />
            </div>
            <div class="form-group">
                <label for="eventDate">Event Date</label>
                <input type="date" id="eventDate" v-model="eventDate" required />
            </div>
            <div class="form-group">
                <label for="eventTime">Event Time</label>
                <input type="time" id="eventTime" v-model="eventTime" required />
            </div>
            <div class="form-group">
                <label for="sports">Sports</label>
                <input type="text" id="sports" v-model="sports" required />
            </div>
            <!-- <div class="form-group">
                <label for="location">Location</label>
                <input type="text" id="location" v-model="location" required />
            </div> -->
            <div class="form-group">
                <label for="location">Location</label>
                <input type="text" id="location" v-model="location" required placeholder="Enter Location"
                    @input="handleLocationInput" />
            </div>
            <div class="form-group inline">
                <input type="checkbox" id="isLeagueMatch" v-model="isLeagueMatch" />
                <label for="isLeagueMatch">Is League Match</label> 
            </div>
            <div v-if="isLeagueMatch" class="form-group">
                <label for="selectedLeague">Select League</label>
                <select id="selectedLeague" v-model="selectedLeague" required>
                    <option v-for="league in leagues" :key="league._id" :value="league._id">{{ league.leagueName }}
                    </option>
                </select>
            </div>
            <div class="form-group inline">
                <input type="checkbox" id="isLeagueMatch" v-model="addTeams" />
                <label for="isLeagueMatch">Add Teams</label> 
            </div>
            <div v-if="addTeams" class="form-group">
                <label for="selectedTeam1">Select Team 1</label>
                <select id="selectedTeam1" v-model="selectedTeam1" required>
                    <option v-for="team in teams" :key="team._id" :value="team._id">{{ team.teamName }}</option>
                </select>
            </div>
            <div v-if="addTeams" class="form-group">
                <label for="selectedTeam2">Select Team 2</label>
                <select id="selectedTeam2" v-model="selectedTeam2" required>
                    <option v-for="team in teams" :key="team._id" :value="team._id">{{ team.teamName }}</option>
                </select>
            </div>
            <button type="submit">Add Event</button>
            <button class="cancel-button" type="button" @click="handleCancel">Cancel</button>
        </form>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import apiClient from '@/services/apiClient';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();

const router = useRouter();

const eventType = ref('');
const eventDate = ref('');
const eventTime = ref('');
const sports = ref('');
const location = ref('');
const isLeagueMatch = ref(true);
const addTeams = ref(true)
const selectedLeague = ref('');
const selectedTeam1 = ref('');
const selectedTeam2 = ref('');
const leagues = ref([]);
const teams = ref([]);

const handleLocationInput = async () => {
    
    const options = {
        types: ['geocode'], // Restrict suggestions to locations
        componentRestrictions: { country: 'ca' }, // Optional: Limit suggestions to a specific country
    };

    const autocomplete = new google.maps.places.Autocomplete(document.getElementById('location'), options);

    // Handle place selection and update location field
    autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        if (place.geometry) {
            location.value = place.formatted_address;
        }
    });
};







// Fetch leagues and teams data from the backend
const fetchLeaguesAndTeams = async () => {
    try {
        const response = await apiClient.get('/leagues', {
            headers: { Authorization: `Bearer ${authStore.authToken}` },
        });
        leagues.value = response.data;

        const response2 = await apiClient.get('/teams', {
            headers: { Authorization: `Bearer ${authStore.authToken}` },
        });
        teams.value = response2.data;


    } catch (error) {
        console.error('Error fetching leagues:', error);
    }
};

// Watch for changes in selectedLeague and fetch teams accordingly
watch(selectedLeague, () => {
    fetchLeaguesAndTeams();
});

const handleSubmit = async () => {
    try {
        const response = await apiClient.post('/events', {
            eventType: eventType.value,
            eventDate: eventDate.value,
            eventTime: eventTime.value,
            sports: sports.value,
            location: location.value,
            isLeagueMatch: isLeagueMatch.value,
            selectedLeague: selectedLeague.value ? selectedLeague.value : null,
            selectedTeam1: selectedTeam1.value ? selectedTeam1.value : null,
            selectedTeam2: selectedTeam2.value ? selectedTeam2.value : null
        }, {
            headers: { Authorization: `Bearer ${authStore.authToken}` }
        });

        console.log('Event added successfully:', response.data);

        alert("New Event Added.")

        router.push('/admin')
    } catch (error) {
        console.error('Error adding event:', error);
        // Handle error, display error message, etc.
    }
};

const handleCancel = () => {
    // Navigate back to the previous page
    router.go(-1);
};


// Fetch leagues data on component mount
fetchLeaguesAndTeams();
</script>

<style scoped>
.add-event-container {
    max-width: 600px;
    margin: auto;
    padding: 20px;
}

.form-group {
    margin-bottom: 15px;
}

.inline{
    display: flex;
    flex-direction: row;
    align-items: stretch;
}


label {
    display: block;
    margin-bottom: 5px;
}

input[type='text'],
input[type='date'],
input[type='time'] {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 5px;
}




select {
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

.cancel-button {
    background-color: #ff4d4f;
    margin-left: 20px;
}



</style>