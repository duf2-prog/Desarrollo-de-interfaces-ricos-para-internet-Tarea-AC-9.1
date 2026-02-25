import './styles/App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './routes/ProtectedRoute';
import AdminRoute from './routes/AdminRoute';
import Menu from './pages/Menu';
import Order from './pages/Order';
import CartPage from './pages/CartPage';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminStock from './pages/AdminStock';
import AdminUsers from './pages/AdminUsers';
import Navbar from './components/Navbar';
import { AuthProvider } from './contexts/AuthContext';

function App() {

  return (
    <AuthProvider>
      <Router>
          <Navbar />
          <div className='main-content'>
            <Routes>
              <Route path="/" element={<Menu />} />
              <Route path="/order/:id" element={<Order />} />
              <Route path="/cart" element={<ProtectedRoute><CartPage/></ProtectedRoute>} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/stock" element={<AdminRoute><AdminStock /></AdminRoute>} />
              <Route path="/users" element={<AdminRoute><AdminUsers /></AdminRoute>} />
            </Routes>
          </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
