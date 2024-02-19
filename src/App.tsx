import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { ApplicationState } from './store';
import Header from './components/Header';
import Login from './pages/Login';
import NotFound from './pages/NotFound';

import { connect } from "react-redux";
import { AuthState } from "./store/ducks/auth/types"
import Home from "./pages/Home";
import './theme.sass';
import { decryptData } from './utils';

function App({ authReducer }: { authReducer: AuthState }) {
  return (
    <div className='wrapper'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Header />}>
            <Route index element={<Login />} />
            <Route path="*" element={<NotFound />} />
            <Route element={<ProtectedRoute user={authReducer.data} />}>
              <Route path="home" element={<Home />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

const mapStateToProps = ({ authReducer }: ApplicationState) => ({
  authReducer: authReducer,
});

export default connect(mapStateToProps)(App);

const ProtectedRoute = ({ user, redirectPath = '' }: any) => {
  // const cryptoToken = localStorage.getItem('authToken');
  // const token = decryptData(cryptoToken)
  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }
  return <Outlet />;
};


