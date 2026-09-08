import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import RequestPickup from './pages/RequestPickup';
import MyRequests from './pages/MyRequests';
import Centres from './pages/Centres';
import Awareness from './pages/Awareness';
import AdminPanel from './pages/AdminPanel';

// Protected Route Component
const ProtectedRoute = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem('token');
  return (
    <Route
      {...rest}
      render={(props) =>
        token ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

// Admin Route Component
const AdminRoute = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <Route
      {...rest}
      render={(props) =>
        token && user.role === 'admin' ? (
          <Component {...props} />
        ) : token ? (
          <Redirect to="/dashboard" />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

function App() {
  return (
    <Router>
      <div className="app-wrapper w-100 min-vh-100 bg-subtle">
        <Navbar />
        <main className="main-content w-100">
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            
            <ProtectedRoute exact path="/dashboard" component={Dashboard} />
            <ProtectedRoute exact path="/request" component={RequestPickup} />
            <ProtectedRoute exact path="/myrequests" component={MyRequests} />
            <ProtectedRoute exact path="/centres" component={Centres} />
            <ProtectedRoute exact path="/awareness" component={Awareness} />

            <AdminRoute exact path="/admin" component={AdminPanel} />

            <Redirect to="/" />
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;