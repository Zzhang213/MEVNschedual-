<template>
  <div class="event-card">
    <h3>{{ event.eventType }}</h3>
    <hr>
    <p><strong>Date:</strong> {{ formatDate(event.eventDate) }}</p>
    <p><strong>Time:</strong> {{ event.eventTime }}</p>
    <p><strong>Sports:</strong> {{ event.sports }}</p>
    <p><strong>Location:</strong> {{ event.location }}</p>
    <p><strong>League Match:</strong> {{ event.isLeagueMatch ? 'Yes' : 'No' }}</p>
    <div v-if="event.isLeagueMatch">
      <p><strong>Selected League:</strong> {{ event.selectedLeague?.leagueName }}</p>
    </div>
    <p><strong>Team 1:</strong> {{ event.selectedTeam1?.teamName }}</p>
    <p><strong>Team 2:</strong> {{ event.selectedTeam2?.teamName }}</p>

    <div ref="mapContainer" class="map-container"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps(['event']);
//console.log(JSON.parse(JSON.stringify(props.event.location)))

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString();
};

const showMap = async () => {
  const loc = JSON.parse(JSON.stringify(props.event.location))
  if (!loc) return;

  const eventLocation = await getLatLong(loc)

  if(eventLocation == null) return

  const mapOptions = {
    center: { lat: eventLocation.latitude, lng: eventLocation.longitude },
    zoom: 12,
  };

  const map = new google.maps.Map(mapContainer.value, mapOptions);

  const marker = new google.maps.Marker({
    position: { lat: eventLocation.latitude, lng: eventLocation.longitude },
    map: map,
    title: 'Event Location'
  });
};


async function getLatLong(locationName) {
  const geocoder = new google.maps.Geocoder();
  const address = `${locationName}, Pakistan`; // Combine location name and country

  try {
    const response = await geocoder.geocode({ address });
    if (response.results.length > 0) {
      const place = response.results[0];
      return {
        latitude: place.geometry.location.lat(),
        longitude: place.geometry.location.lng(),
      };
    } else {
      console.warn(`No results found for location: ${locationName}`);
      return null;
    }
  } catch (error) {
    console.error('Error fetching lat/lng:', error);
    return null;
  }
}

const mapContainer = ref(null);

onMounted(() => {
  showMap();
});
</script>

<style scoped>
.event-card {
  border: 1px solid #ccc;
  padding: 10px;
  margin: 10px;
  width: 400px;
  background-color: #f9f9f9;
  border-radius: 5px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}

.event-card h3 {
  margin-bottom: 10px;
  color: #333;
}

.event-card hr {
  margin: 10px 0;
  border: 1px solid #ccc;
}

.event-card p {
  margin: 5px 0;
}

.event-card strong {
  font-weight: bold;
}

.map-container {
  height: 300px;
}
</style>
