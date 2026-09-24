// Reusable API Client for RailConnect
// Handles Base URL, Authorization Header, JSON Headers, and Global Error Handling

const BASE_URL = import.meta.env.VITE_API_URL !== undefined ? import.meta.env.VITE_API_URL : "http://localhost:5000";

/**
 * Generic fetch wrapper for all API calls
 * @param {string} endpoint - API path (e.g. "/api/auth/login")
 * @param {object} options - Fetch configuration options
 */
export async function apiClient(endpoint, { body, headers: customHeaders, ...customConfig } = {}) {
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    ...customHeaders,
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const config = {
    method: body ? "POST" : "GET",
    ...customConfig,
    headers,
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  let response;
  try {
    const fullUrl = (endpoint.startsWith("http") || !BASE_URL) ? endpoint : `${BASE_URL}${endpoint}`;
    response = await fetch(fullUrl, config);
  } catch (err) {
    // If direct BASE_URL fetch failed (e.g. localhost IPv6 browser quirk), fallback to relative path (Vite proxy)
    if (!endpoint.startsWith("http") && BASE_URL && BASE_URL !== "") {
      try {
        response = await fetch(endpoint, config);
      } catch (fallbackErr) {
        throw new Error("Unable to connect to RailConnect backend server. Please verify backend is running on port 5000.");
      }
    } else {
      throw new Error("Unable to connect to RailConnect backend server. Please verify backend is running on port 5000.");
    }
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    if (response.status === 401) {
      // Clear invalid auth token if expired
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.dispatchEvent(new Event("auth-unauthorized"));
    }

    const errorMessage = data.message || `Request failed with status ${response.status}`;
    const error = new Error(errorMessage);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}
