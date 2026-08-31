/**
 * API Configuration Utility
 * Supports Codespaces with VITE_CODESPACE_NAME environment variable
 * Provides fallback to localhost for local development
 */

// Get the Codespaces name from Vite environment variables
const CODESPACE_NAME = import.meta.env.VITE_CODESPACE_NAME;

/**
 * Build the API base URL based on environment
 * Codespaces: https://${VITE_CODESPACE_NAME}-8000.app.github.dev
 * Local: http://localhost:8000
 */
const getApiBaseUrl = () => {
  if (CODESPACE_NAME && CODESPACE_NAME !== 'undefined') {
    console.log(`✅ Using Codespaces API URL with CODESPACE_NAME: ${CODESPACE_NAME}`);
    return `https://${CODESPACE_NAME}-8000.app.github.dev`;
  }
  
  console.warn('⚠️  VITE_CODESPACE_NAME not set. Using localhost fallback.');
  console.warn('📝 Set VITE_CODESPACE_NAME in .env.local for Codespaces support');
  return 'http://localhost:8000';
};

export const API_BASE_URL = getApiBaseUrl();

/**
 * Fetch data from API endpoint
 * @param {string} endpoint - The API endpoint (e.g., '/api/users')
 * @returns {Promise<any>} - Parsed JSON response
 */
export async function fetchFromApi(endpoint) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  try {
    console.log(`📡 Fetching: ${url}`);
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`API Error ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`❌ Failed to fetch ${url}:`, error);
    throw error;
  }
}

/**
 * Extract data array from API response
 * Handles both paginated responses and direct arrays
 * @param {any} response - API response object
 * @returns {Array} - Data array
 */
export function extractDataArray(response) {
  if (!response) return [];
  
  // If response has a 'data' property (common API format)
  if (response.data && Array.isArray(response.data)) {
    return response.data;
  }
  
  // If response is already an array
  if (Array.isArray(response)) {
    return response;
  }
  
  // Fallback to empty array
  return [];
}

console.log(`🚀 API Configuration:
  - Base URL: ${API_BASE_URL}
  - Environment: ${CODESPACE_NAME ? 'Codespaces' : 'Local Development'}
  - CODESPACE_NAME: ${CODESPACE_NAME || 'not set'}
`);
