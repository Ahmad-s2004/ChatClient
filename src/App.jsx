import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Setting from './pages/Setting';

function App() {

  const isAuthenticated = () =>{
    const user = JSON.parse(localStorage.getItem('profile'))
    return user?.token ? true:false
  }

  const PrivateRoute = ({children}) => {
    return isAuthenticated() ? children : <Navigate to="/signin"/>
  }


  return (
    <Router>
      <Routes>
        <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/setting" element={<PrivateRoute><Setting /></PrivateRoute>} />
        <Route path="/signin" element={
          isAuthenticated()? <Signin />: <Navigate to="/"/>
        } />
        <Route path="/signup" element={
          isAuthenticated()? <Signup />: <Navigate to="/"/>
        } />
      </Routes>
    </Router>
  );
}


export default App

// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Signin from './pages/Signin';
// import Signup from './pages/Signup';
// import Home from './pages/Home';
// import Setting from './pages/Setting';

// function App() {

//   const isAuthenticated = () => {
//     const user = JSON.parse(localStorage.getItem('profile'));
//     return user?.token ? true : false;
//   }

//   // Spelling fix: childern -> children
//   const PrivateRoute = ({ children }) => {
//     return isAuthenticated() ? children : <Navigate to="/signin" replace />;
//   }

//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
//         <Route path="/setting" element={<PrivateRoute><Setting /></PrivateRoute>} />
        
//         {/* Yahan function ko call kiya isAuthenticated() */}
//         <Route path="/signin" element={
//           !isAuthenticated() ? <Signin /> : <Navigate to="/" replace />
//         } />
        
//         <Route path="/signup" element={
//           !isAuthenticated() ? <Signup /> : <Navigate to="/" replace />
//         } />
//       </Routes>
//     </Router>
//   );
// }

// export default App;