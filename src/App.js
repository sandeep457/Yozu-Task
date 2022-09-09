import {  BrowserRouter,  Routes,  Route} from "react-router-dom";
import "./App.css";
import Dashboard from "./Components/Dashboard";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import ProtectedRoute from "./Components/ProtectedRoute";
import { UserAuthContextProvider } from "./Context/UserAuthContext";
function App() {
  return (
    <>
      <UserAuthContextProvider>
        <BrowserRouter>
          <Routes>
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </BrowserRouter>
      </UserAuthContextProvider>
    </>
  );
}

export default App;