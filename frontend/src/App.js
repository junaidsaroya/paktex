import './App.css';
import {Navigate, Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {checkToken} from './utils/auth';
import ProtectedRoute from './routes/ProtectedRoutes';
import {routesConfig} from './routes/routesConfig';
function App() {
  const dispatch = useDispatch();
  const {isLoggedIn, isLoading} = useSelector((state) => state.app);

  useEffect(() => {
    checkToken(dispatch);
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="App">
      <Routes>
        {routesConfig.map(({path, element, protected: isProtected}) => {
          const routeElement = isProtected ? (
            <ProtectedRoute>
              <Home>{element}</Home>
            </ProtectedRoute>
          ) : (
            element
          );
          if (path === '/' && isLoggedIn) {
            return (
              <Route
                key={path}
                path={path}
                element={<Navigate to="/dashboard" />}
              />
            );
          }
          return <Route key={path} path={path} element={routeElement} />;
        })}
      </Routes>
    </div>
  );
}

export default App;
