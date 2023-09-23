import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import NavBar from './components/NavBar/NavBar';
import AuthProvider, { useUser } from './contexts/AuthContext';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import ChatPage from './pages/ChatPage';
import NotFoundPage from './pages/NotFoundPage';
import routes from './common/routes';

const PrivateOutlet = () => {
  const user = useUser();
  return user ? <Outlet /> : <Navigate to={routes.loginPagePath()} />;
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="h-100">
          <div className="d-flex flex-column h-100">
            <NavBar />
            <Routes>
              <Route path={routes.chatPagePath()} element={<PrivateOutlet />}>
                <Route path="" element={<ChatPage />} />
              </Route>
              <Route path={routes.loginPagePath()} element={<LoginPage />} />
              <Route path={routes.signupPagePath()} element={<SignUpPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </div>
        <ToastContainer />
      </Router>
    </AuthProvider>
  );
};
export default App;
