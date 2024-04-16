<template>
  <div>
    <h1>All Events</h1>
    <div v-if="upcomingEvents.length">
      <h2>Upcoming Events</h2>
      <div class="tiles">
        <div v-for="event in reversedUpcomingEvents" :key="event.id">
          <eventCard :event="event" @delete-event="deleteEvent" />
        </div>
      </div>
    </div>
    <div v-else>
      <p>No upcoming events found.</p>
    </div>
    <div v-if="pastEvents.length">
      <h2>Past Events</h2>
      <div class="tiles">
        <div v-for="event in reversedPastEvents" :key="event.id">
          <eventCard :event="event" @delete-event="deleteEvent" />
        </div>
      </div>
    </div>
    <div v-else>
      <p>No past events found.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import apiClient from '@/services/apiClient';
import { useAuthStore } from '@/stores/auth';
import eventCard from '../components/eventCard.vue'

const authStore = useAuthStore();
const events = ref([]);

const upcomingEvents = computed(() => {
  const currentDate = new Date();
  return events.value.filter(event => new Date(event.eventDate) > currentDate);
});

const pastEvents = computed(() => {
  const currentDate = new Date();
  return events.value.filter(event => new Date(event.eventDate) <= currentDate);
});

// Reverse the arrays
const reversedUpcomingEvents = computed(() => upcomingEvents.value.slice().reverse());
const reversedPastEvents = computed(() => pastEvents.value.slice().reverse());

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
    fetchEvents(); // Fetch events after deletion
  } catch (error) {
    console.error('Error deleting event:', error);
  }
};

onMounted(fetchEvents); // Fetch events on component mount
</script>

<style>
.tiles {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
}
</style>
