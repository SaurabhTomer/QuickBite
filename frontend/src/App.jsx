// Importing required modules from react-router-dom for routing
import { Routes, Route, Navigate } from "react-router-dom";

// Importing all the pages (components) of the app
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import CreateEditShop from './pages/CreateEditShop'

// Importing custom hook to fetch current logged-in user
import usegetCurrentuser from "./hooks/usegetCurrentuser";

// Importing useSelector from redux to access the Redux store state
import { useSelector } from "react-redux";
import useGetCity from "./hooks/useGetCity";
import useGetMyShop from "./hooks/useGetMyShop";

// Backend server URL (API base URL)
export const serverUrl = "http://localhost:8000";

function App() {
  // Call the custom hook that fetches current user info (if logged in)
  // This runs once when the App component mounts
  usegetCurrentuser();
  useGetCity();
  useGetMyShop();
  // Get user data from Redux store
  const { userData } = useSelector((state) => state.user);

  // Define all routes using <Routes> and <Route>
  return (
    <Routes>
      <Route
        path="/"
        element={userData ? <Home /> : <Navigate to={"/signin"} />}
      />

      <Route
        path="/signup"
        element={!userData ? <SignUp /> : <Navigate to={"/"} />}
      />

      <Route
        path="/signin"
        element={!userData ? <SignIn /> : <Navigate to={"/"} />}
      />

      <Route
        path="/forgot-password"
        element={!userData ? <ForgotPassword /> : <Navigate to={"/"} />}
      />
       <Route
        path="/create-edit-shop"
        element={!userData ? <CreateEditShop /> : <Navigate to={"/signin"} />}
      />
    </Routes>
  );
}

export default App;
