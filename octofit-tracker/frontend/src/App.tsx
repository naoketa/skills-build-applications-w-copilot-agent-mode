import { useState, useEffect } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import { API_BASE_URL, API_ENDPOINTS, fetchFromApi } from './services/apiClient'

interface ApiStatus {
  status: string;
  message: string;
  apiUrl: string;
  environment: string;
}

interface User {
  _id: string;
  name: string;
  email: string;
  activityPoints: number;
}

function App() {
  const [count, setCount] = useState(0)
  const [apiStatus, setApiStatus] = useState<ApiStatus | null>(null)
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const checkApi = async () => {
      try {
        // Check API health
        const healthData = await fetchFromApi(API_ENDPOINTS.health)
        setApiStatus(healthData)

        // Fetch users
        const usersData = await fetchFromApi(API_ENDPOINTS.users)
        setUsers(usersData.data || [])
        
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to connect to API')
        console.error('API Error:', err)
      } finally {
        setLoading(false)
      }
    }

    checkApi()
  }, [])

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Get started</h1>
          <p>
            Edit <code>src/App.tsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
      </section>

      <div className="ticks"></div>

      {/* API Status Section */}
      <section id="api-status">
        <h2>🔗 API Status</h2>
        {loading && <p>Loading API data...</p>}
        {error && <p style={{ color: 'red' }}>⚠️ Error: {error}</p>}
        {apiStatus && (
          <div>
            <p><strong>Status:</strong> {apiStatus.status}</p>
            <p><strong>API URL:</strong> {apiStatus.apiUrl}</p>
            <p><strong>Environment:</strong> {apiStatus.environment}</p>
            <p><strong>Configured Base URL:</strong> {API_BASE_URL}</p>
          </div>
        )}
      </section>

      {/* Users Section */}
      <section id="users">
        <h2>👥 Users ({users.length})</h2>
        {users.length > 0 ? (
          <ul>
            {users.map((user) => (
              <li key={user._id}>
                <strong>{user.name}</strong> - {user.email} ({user.activityPoints} points)
              </li>
            ))}
          </ul>
        ) : (
          !loading && <p>No users found</p>
        )}
      </section>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Documentation</h2>
          <p>Your questions, answered</p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank">
                <img className="logo" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank">
                <img className="button-icon" src={reactLogo} alt="" />
                Learn more
              </a>
            </li>
          </ul>
        </div>
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Connect with us</h2>
          <p>Join the Vite community</p>
          <ul>
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                X.com
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                Bluesky
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
