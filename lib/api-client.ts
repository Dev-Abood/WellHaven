import axios from "axios"

// Create an axios instance with default config
const apiClient = axios.create({
  baseURL: "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
})

// Add a request interceptor to include auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("wellhaven_token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Add a response interceptor to handle errors
apiClient.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // Handle 401 Unauthorized errors
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("wellhaven_token")
      localStorage.removeItem("wellhaven_user")
      window.location.href = "/login"
    }
    return Promise.reject(error)
  },
)

export default apiClient
