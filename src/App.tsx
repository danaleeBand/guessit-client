import './App.css'
import Home from './pages/Home.tsx'
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom'
import Start from './pages/Start.tsx'
import Room from './pages/Room.tsx'
import { Toaster } from '@/components/ui/toaster.tsx'

const ProtectedRoute = ({ element }: { element: JSX.Element }) => {
  const isAuthenticated = sessionStorage.getItem('playerId')

  return isAuthenticated ? element : <Navigate to="/input-nickname" />
}

function App() {
  return (
    <Router>
      <Toaster />
      <Routes>
        <Route path="/input-nickname" element={<Start />} />
        <Route path="/" element={<ProtectedRoute element={<Home />} />} />
        <Route path="/home" element={<ProtectedRoute element={<Home />} />} />
        <Route
          path="/room/:id"
          element={<ProtectedRoute element={<Room />} />}
        />
      </Routes>
    </Router>
  )
}

export default App
