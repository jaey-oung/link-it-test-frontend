import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // 환경 변수에서 API URL 가져오기
  const API_URL = `${import.meta.env.VITE_API_URL}/api/clicks`

  // 페이지 로드 시 현재 클릭 수 가져오기
  useEffect(() => {
    fetchCount()
  }, [])

  // 클릭 수 조회
  const fetchCount = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch(API_URL)
      const data = await response.json()
      setCount(data.count)
    } catch (err) {
      setError('Failed to fetch count')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // 클릭 버튼 핸들러
  const handleClick = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch(API_URL, {
        method: 'POST',
      })
      const data = await response.json()
      setCount(data.count)
    } catch (err) {
      setError('Failed to increment count')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="App">
      <div className="container">
        <h1>Link-It Click Counter</h1>
        <div className="card">
          <h2>Total Clicks</h2>
          <div className="count-display">
            {loading ? '...' : count}
          </div>
          <button 
            onClick={handleClick} 
            disabled={loading}
            className="click-button"
          >
            {loading ? 'Loading...' : 'Click Me!'}
          </button>
          {error && <p className="error">{error}</p>}
        </div>
      </div>
    </div>
  )
}

export default App