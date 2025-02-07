import './App.css'
import Home from './Home.tsx'
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom'
import NicknameInput from './NicknameInput.tsx'

const ProtectedRoute = ({ element }: { element: JSX.Element }) => {
  const isAuthenticated = sessionStorage.getItem('playerId')

  return isAuthenticated ? element : <Navigate to="/input-nickname" />
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/input-nickname" element={<NicknameInput />} />
        <Route path="/" element={<ProtectedRoute element={<Home />} />} />
        <Route path="/home" element={<ProtectedRoute element={<Home />} />} />
      </Routes>
    </Router>
  )
}

export default App
