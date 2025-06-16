import AuthLayout from "../../components/layouts/AuthLayout";
import { useState, useContext } from "react";
import Input from "../../components/inputs/Input";
import { Link, Route, useNavigate } from "react-router";
import { validateEmail } from "../../utils/helper.js";
import axiosInstance from "../../utils/axiosInstance.js";
import { API_PATHS } from "../../utils/apiPath.js";
import { UserContext } from "../../assets/context/UserContext.jsx";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { updateUser } = useContext(UserContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Invalid email address.");
      return;
    }

    if (!password) {
      setError("Please eneter the password.");
      return;
    }
    setError("");
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });

      const { token, role } = response.data;
      if (token) {
        updateUser(response.data);
      }

      if (role === "admin") {
        navigate("admin/dashboard");
      } else navigate("user/dashboard");
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };
  return (
    <div>
      <AuthLayout>
        <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
          <h3 className="text-xl font-semibold text-black">Welcome Back</h3>
          <p className="text-xs font-medium text-slate-700 mt-1">
            Please enter your deatils to log in
          </p>

          <form onSubmit={handleLogin}>
            <Input
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              label="Email Address"
              placeholder="john@example.com"
              type="text"
            />

            <Input
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              label="Password"
              placeholder="Min 8 Characters"
              type="password"
            />

            <button type="submit" className="btn-primary">
              LOGIN
            </button>
            {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
            <p className="text-[13px] text-slate-800 mt-3">
              Don't have an account?
              <Link
                to="/accounts/signup"
                className="font-medium text-primary underline"
              >
                SignUp
              </Link>
            </p>
          </form>
        </div>
      </AuthLayout>
    </div>
  );
};

export default Login;
