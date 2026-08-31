/**
 * API Configuration
 * Supports both Codespaces and localhost environments
 */

declare global {
  interface Window {
    __CODESPACE_NAME__?: string;
    __API_DEBUG__?: {
      hostname: string;
      protocol: string;
      codespaceName: string | null;
    };
  }
}

const getApiBaseUrl = (): string => {
  // Check if running in Codespaces
  const codespaceName = window.__CODESPACE_NAME__;
  
  if (codespaceName) {
    // Codespaces URL format: https://{CODESPACE_NAME}-{PORT}.app.github.dev
    console.log(`✅ Detected Codespaces environment: ${codespaceName}`);
    return `https://${codespaceName}-8000.app.github.dev`;
  }
  
  // Fallback to localhost for local development
  console.log('ℹ️  Running in local development mode');
  return 'http://localhost:8000';
};

export const API_BASE_URL = getApiBaseUrl();

// API endpoints
export const API_ENDPOINTS = {
  health: `${API_BASE_URL}/api/health`,
  users: `${API_BASE_URL}/api/users`,
  teams: `${API_BASE_URL}/api/teams`,
  activities: `${API_BASE_URL}/api/activities`,
  leaderboard: `${API_BASE_URL}/api/leaderboard`,
  workouts: `${API_BASE_URL}/api/workouts`,
};

/**
 * Fetch data from API
 * @param endpoint - API endpoint URL
 * @returns Promise with response data
 */
export const fetchFromApi = async (endpoint: string) => {
  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('API fetch error:', error);
    throw error;
  }
};

console.log(`🚀 API Base URL: ${API_BASE_URL}`);
