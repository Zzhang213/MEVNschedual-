import axios from 'axios';
import { useAuthStore } from '../stores/auth';


const apiClient = axios.create({
  baseURL: 'http://localhost:5111',
  withCredentials: true,
});



// Add an interceptor to handle forbidden responses
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 403) {
      // If the response status is 403 (Forbidden), call the logout function
      const authStore = useAuthStore();
      authStore.logout();

      router.push('/login');
    }
    return Promise.reject(error);
  }
);

export default apiClient;
