import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Setting from './pages/Setting';

function App() {

  const isAuthenticated = () => {
    try {
      const profile = localStorage.getItem('profile');
      if (!profile || profile === "undefined") return false;
      
      const user = JSON.parse(profile);
      return !!(user && user.token); 
    } catch (error) {
      return false;
    }
  }

  const PrivateRoute = ({ children }) => {
    return isAuthenticated() ? children : <Navigate to="/signin" replace />;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/setting" element={<PrivateRoute><Setting /></PrivateRoute>} />
        
        <Route path="/signin" element={
          !isAuthenticated() ? <Signin /> : <Navigate to="/" replace />
        } />
        
        <Route path="/signup" element={
          !isAuthenticated() ? <Signup /> : <Navigate to="/" replace />
        } />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;