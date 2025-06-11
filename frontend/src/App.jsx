import { Route, BrowserRouter as Router, Routes } from "react-router";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import DashBoard from "./pages/admin/DashBoard";
import UserDashBoard from "./pages/user/UserDashBoard";
import PrivateRoute from "./routes/PrivateRoute";
const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="accounts/login" element={<Login></Login>}></Route>
          <Route path="accounts/signup" element={<Signup></Signup>}></Route>

          <Route
            element={<PrivateRoute allowedRoles={["admin"]}></PrivateRoute>}
          >
            <Route
              path="admin/dashboard"
              element={<DashBoard></DashBoard>}
            ></Route>
          </Route>

          <Route
            path="user/dashboard"
            element={<UserDashBoard></UserDashBoard>}
          ></Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
