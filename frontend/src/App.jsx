import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate,
  Outlet,
} from "react-router";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import DashBoard from "./pages/admin/DashBoard";
import UserDashBoard from "./pages/user/UserDashBoard";
import PrivateRoute from "./routes/PrivateRoute";
import UserProvider, { UserContext } from "./context/UserContext";
import { useContext } from "react";
const App = () => {
  return (
    <Router>
      <UserProvider>
        <Routes>
          <Route path="/accounts/login" element={<Login></Login>}></Route>
          <Route path="/accounts/signup" element={<Signup></Signup>}></Route>

          <Route
            element={<PrivateRoute allowedRoles={["admin"]}></PrivateRoute>}
          >
            <Route
              path="/admin/dashboard"
              element={<DashBoard></DashBoard>}
            ></Route>
          </Route>

          <Route
            path="/user/dashboard"
            element={<UserDashBoard></UserDashBoard>}
          ></Route>
          <Route path="/" element={<Root />}></Route>
        </Routes>
      </UserProvider>
    </Router>
  );
};

const Root = () => {
  const { loading, user } = useContext(UserContext);
  if (loading) return <Outlet />;
  // Navigate for auto navigation
  if (!user) return <Navigate to="/accounts/login"></Navigate>;
  return user.role === "admin" ? (
    <Navigate to="/admin/dashboard"></Navigate>
  ) : (
    <Navigate to="/user/dashboard"></Navigate>
  );
};

export default App;
